import { Handlers } from "$fresh/server.ts";
import {
  ConvoState,
  LLM,
  Personalities,
} from "../../../../state-flow/database.ts";
import {
  loadAzureExtensionOptions,
  loadReadableChatStream,
} from "../../../../src/openai/utils.ts";
import { ConversationMessage } from "@fathym/synaptic";
import {
  HarborPersonality,
  PortrayalsPersonality,
} from "../../../../state-flow/personalities.config.ts";
import { FunctionDefinition } from "npm:@azure/openai@next";

export const handler: Handlers = {
  async GET(_req, ctx) {
    //   const convoLookup = ctx.params.convoLookup;

    //   const messages = (await ConvoState.History(convoLookup)) || [];

    //   const body = JSON.stringify(messages);

    //   return new Response(body, {
    //     headers: {
    //       "content-type": "application/json",
    //       "cache-control": "no-cache",
    //     },
    //   });
    // },
    // async POST(_req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    const personality = await Personalities.Provide(PortrayalsPersonality);

    const messages = (await ConvoState.History(convoLookup)) || [];

    const convoMsg: ConversationMessage = {
      Content: "Please make the basic report portrayal content way longer",
      From: "user",
    };

    const azureSearchIndexName = Deno.env.get("AZURE_SEARCH_INDEX_NAME");

    const chatResp = await LLM.Chat(personality, [...messages], {
      Model: "gpt-35-turbo-16k",
      // Extensions: loadAzureExtensionOptions(azureSearchIndexName!),
      FunctionRequired: 0,
      Functions: loadHarborFunctions(),
    });

    const body = JSON.stringify(chatResp);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
};

export function loadHarborFunctions(): FunctionDefinition[] {
  return [pieChartPortrayal()];
}

export function basicReportPortrayal(): FunctionDefinition {
  return {
    name: "BasicReportPortrayal",
    description:
      "The basic report portrayal is used to provide out a title, abstract, and full report content.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the report should be a short, understandable set of text that describes what is in the report.",
        },
        abstract: {
          type: "string",
          description:
            "The abstract is a more detailed description of the report that can be used by a user to discern if the report is useful for them.",
        },
        content: {
          type: "string",
          description:
            "This is the complete report content, it should be verbose and express a detailed set of information to inform report consumers. It should be written as MDX, and contain 5 to 10 sections of markdown content, where each section is 200 - 500 characters. This makes each report content 1000 - 5000 characters long.",
        },
      },
      required: [
        "title",
        "abstract",
        "content",
      ],
    },
  };
}

export function bulletListPortrayal(): FunctionDefinition {
  return {
    name: "BulletListPortrayal",
    description:
      "The bullet list portrayal is used to provide out a title, abstract, and full report content.",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description:
            "The title of the report should be a short, understandable set of text that describes what is in the report.",
        },
        abstract: {
          type: "string",
          description:
            "The abstract is a more detailed description of the report that can be used by a user to discern if the report is useful for them.",
        },
        list: {
          type: "array",
          description:
            "The 3 - 7 highlighted bullet points to use for the report.",
          items: {
            type: "string",
            description:
              "This is a unique, highlighted bullet point, to use for informing the user about important information.",
          },
        },
      },
      required: [
        "title",
        "abstract",
        "list",
      ],
    },
  };
}

export function pieChartPortrayal(): FunctionDefinition {
  return {
    name: "PieChartPortrayal",
    description:
      "The pie chart portrayal is used to pull together a chart that represents  acollection of data as a percentage of a whole.",
    parameters: {
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
            "The labels represent the entity whose data is being tracked. There should be the same number of labels in this array as are in the data array.",
          items: {
            type: "string",
            description:
              "This is a unique label that represents the entity that's data is being tracked.",
          },
        },
        data: {
          type: "array",
          description:
            "The data represents the value of data that is being tracked for an entity label. There should be the same number of datas in this array as are in the labels array.",
          items: {
            type: "string",
            description: "This is the data value to use for a specific label.",
          },
        },
      },
      required: ["title", "labels", "data"],
    },
  };
}
