import { Handlers } from "$fresh/server.ts";
import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
import { loadIndigoPersonality } from "../../../state-flow/personalities.ts";
import { listConversationMessages } from "../../../state-flow/database.ts";
import {
  loadAzureExtensionOptions,
  loadReadableChatStream,
} from "../../../src/openai/utils.ts";

const endpoint = Deno.env.get("ENDPOINT") || "";
const azureApiKey = Deno.env.get("AZURE_API_KEY") || "";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export const handler: Handlers = {
  async GET(_req, ctx) {
    const deploymentId = ctx.params.deploymentId;

    const convoId = ctx.params.convoId;

    const personality = loadIndigoPersonality();

    const messages = (await listConversationMessages(convoId)) || [];

    const declarations = personality.Declarations!.join(" ");

    const instructions = personality.Instructions!.join(" ");

    const chatMessages = messages.map((msg) => {
      return {
        role: msg.value.From,
        content: msg.value.Content,
      };
    });

    chatMessages.push();

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

    const body = loadReadableChatStream(chatCompletions);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
};
