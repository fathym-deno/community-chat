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
import { HarborPersonality } from "../../../../state-flow/personalities.config.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    const messages = (await ConvoState.History(convoLookup)) || [];

    const body = JSON.stringify(messages);

    return new Response(body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
  async POST(req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    const personality = await Personalities.Provide(HarborPersonality);

    const url = new URL(req.url);

    const convoMsg: ConversationMessage = {
      Content: await req.text(),
      From: "user",
    };

    await ConvoState.Add(convoLookup, convoMsg);

    const messages = (await ConvoState.History(convoLookup)) || [];

    const azureSearchIndexName = Deno.env.get("AZURE_SEARCH_INDEX_NAME");

    const useOpenChat = url.searchParams.get("useOpenChat") === "true";

    const chatCompletions = await LLM.ChatStream(personality, messages, {
      Model: "gpt-4-32k",
      // Model: "gpt-35-turbo-16k",
      Extensions: useOpenChat
        ? undefined
        : loadAzureExtensionOptions(azureSearchIndexName!),
      Stream: true,
    });

    const body = loadReadableChatStream(convoLookup, chatCompletions);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    await ConvoState.Reset(convoLookup);

    return new Response(null, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
