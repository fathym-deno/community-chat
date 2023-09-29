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
import { ConversationMessage, FunctionToCall } from "@fathym/synaptic";
import {
  HarborPersonality,
  PortrayalsPersonality,
} from "../../../../state-flow/personalities.config.ts";
import { FunctionDefinition } from "npm:@azure/openai@next";
import { Portrayal, Portrayals } from "../../../../src/PortrayalManager.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const portrayalLookup = ctx.params.portrayalLookup;

    const personality = await Personalities.Provide(PortrayalsPersonality);

    const messages = (await ConvoState.History(portrayalLookup)) || [];

    const apiReq = await req.json();

    const commandMsg: ConversationMessage | undefined = apiReq.command
      ? {
        Content: apiReq.command,
        From: "user",
      }
      : undefined;

    if (commandMsg) {
      messages.push(commandMsg);
    }

    const options = await Portrayals.Options();

    const currentOptionIndex = options.findIndex((o) =>
      o.name === apiReq.portrayal.type
    );

    const azureSearchIndexName = Deno.env.get("AZURE_SEARCH_INDEX_NAME");

    const chatResp = await LLM.Chat(personality, messages, {
      Model: "gpt-4-32k",
      // Extensions: loadAzureExtensionOptions(azureSearchIndexName!),
      FunctionRequired: 0,
      Functions: [options[currentOptionIndex]],
    }) as FunctionToCall;

    const body = JSON.stringify({
      ...apiReq.portrayal,
      details: chatResp.arguments,
      type: chatResp.name,
    } as Portrayal);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const portrayalLookup = ctx.params.portrayalLookup;

    await Portrayals.Delete(portrayalLookup);

    return new Response(null, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
