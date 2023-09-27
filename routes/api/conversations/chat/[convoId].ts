import { Handlers } from "$fresh/server.ts";
import {
  AzureKeyCredential,
  FunctionDefinition,
  OpenAIClient,
} from "npm:@azure/openai@next";
import { loadIndigoPersonality } from "../../../../state-flow/personalities.ts";
import {
  addConversationMessage,
  ConversationMessage,
  listConversationMessages,
  resetConversationMessages,
} from "../../../../state-flow/database.ts";
import {
  loadAzureExtensionOptions,
  loadReadableChatStream,
} from "../../../../src/openai/utils.ts";

const endpoint = Deno.env.get("OPENAI_ENDPOINT") || "";
const azureApiKey = Deno.env.get("OPENAI_API_KEY") || "";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export const handler: Handlers = {
  async GET(_req, ctx) {
    const convoId = ctx.params.convoId;

    const messages = (await listConversationMessages(convoId)) || [];

    const body = JSON.stringify(messages);

    return new Response(body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
  async POST(req, ctx) {
    const deploymentId = "gpt-35-turbo-16k"; //ctx.params.deploymentId;

    const convoId = ctx.params.convoId;

    const personality = loadIndigoPersonality();

    const convoMsg: ConversationMessage = {
      Content: await req.text(),
      From: "user",
    };

    await addConversationMessage(convoId, convoMsg);

    const messages = (await listConversationMessages(convoId)) || [];

    const declarations = personality.Declarations?.join(" ") || "";

    const instructions = personality.Instructions?.join(" ") || "";

    const chatMessages = messages.map((msg) => {
      return {
        role: msg.value.From,
        content: msg.value.Content,
      };
    });

    const azureSearchIndexName = Deno.env.get("AZURE_SEARCH_INDEX_NAME");

    const chatCompletions = await client.listChatCompletions(
      deploymentId,
      [
        {
          role: "system",
          content: `${declarations} ${instructions}`,
        },
        ...chatMessages,
      ],
      {
        azureExtensionOptions: loadAzureExtensionOptions(azureSearchIndexName!),
        maxTokens: 800,
        temperature: 0,
        stream: true,
        topP: 1,
        functionCall: { name: "GlenReport" },
        functions: [loadGlenReportFunction()],
      },
    );

    const body = loadReadableChatStream(convoId, chatCompletions);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const convoId = ctx.params.convoId;

    await resetConversationMessages(convoId);

    return new Response(null, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};

export function loadGlenReportFunction(): FunctionDefinition {
  return {
    name: "GlenReport",
    description: "",
    parameters: {
      type: "object",
      properties: {
        reportTitle: {
          type: "string",
          description: "The title of the report.",
        },
        reportSubhead: {
          type: "string",
          description:
            "A more detailed description of the report for us in describing what can be found.",
        },
        reportContent: {
          type: "string",
          description:
            "A complete description of the report and what can be found within.",
        },
        bulletPointTitle: {
          type: "string",
          description:
            "A title to be used for the listing of bullet point highlights.",
        },
        bulletPointSubhead: {
          type: "string",
          description:
            "The more detailed description of what is contained in the highlighted bullet points.",
        },
        bulletPointContent: {
          type: "array",
          description:
            "The 3 - 7 highlighted bullet points to use for the report.",
          items: {
            type: "string",
            description:
              "This is a unique, highlighted bullet point, to use for informing the user about important information.",
          },
        },
        pieChart: {
          type: "object",
          description:
            "The pie chart represents a slice of data from the reports that represents data in a pie chart.",
          properties: {
            title: {
              type: "string",
              description:
                "The title of the pie chart, short to describe what is in the chart.",
            },
            labels: {
              type: "array",
              description:
                "The labels represent the entity whose data is being tracked. There should be the same number of labels in the array as are in the data array.",
              items: {
                type: "string",
                description:
                  "This is a unique label that represents the entity that's data is being tracked.",
              },
            },
            data: {
              type: "array",
              description:
                "The data represents the value of data that is being tracked for an entity label. There should be the same number of datas in the array as are in the labels array.",
              items: {
                type: "string",
                description:
                  "This is the data value to use for a specific label.",
              },
            },
          },
          required: ["title", "labels", "data"],
        },
      },
      required: [
        "reportTitle",
        "reportSubhead",
        "reportContent",
        "bulletPointTitle",
        "bulletPointSubhead",
        "bulletPointContent",
        "pieChart",
      ],
    },
  };
}
