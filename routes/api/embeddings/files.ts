import { Handlers } from "$fresh/server.ts";
import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
import {
  addConversationMessage,
  ConversationMessage,
} from "../../../state-flow/database.ts";

const endpoint = Deno.env.get("ENDPOINT") || "";
const azureApiKey = Deno.env.get("AZURE_API_KEY") || "";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export const handler: Handlers = {
  async POST(req, ctx) {
    const convoId = ctx.params.convoId;

    const convoMsg: ConversationMessage = {
      Content: await req.text(),
      From: "user",
    };

    await addConversationMessage(convoId, convoMsg);

    return await handler.GET!(req, ctx);
  },
};
