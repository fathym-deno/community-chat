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
import { Portrayals } from "../../../../src/PortrayalManager.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    const personality = await Personalities.Provide(PortrayalsPersonality);

    const messages = (await ConvoState.History(convoLookup)) || [];

    const apiReq = await req.json();

    const commandMsg: ConversationMessage = {
      Content: apiReq.command,
      From: "user",
    };

    const azureSearchIndexName = Deno.env.get("AZURE_SEARCH_INDEX_NAME");

    const chatResp = await LLM.Chat(personality, [...messages, commandMsg], {
      Model: "gpt-35-turbo-16k",
      Extensions: loadAzureExtensionOptions(azureSearchIndexName!),
      FunctionRequired: 0,
      Functions: await Portrayals.Options(),
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
