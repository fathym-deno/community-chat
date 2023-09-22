import { Handlers } from "$fresh/server.ts";
import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
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
const azureApiKey = Deno.env.get("AZURE_API_KEY") || "";

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
    const deploymentId = ctx.params.deploymentId;

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

    const chatCompletions = await client.listChatCompletions(deploymentId, [
      {
        role: "system",
        content: `${declarations} ${instructions}`,
      },
      ...chatMessages,
    ], {
      azureExtensionOptions: loadAzureExtensionOptions(azureSearchIndexName!),
    });

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
