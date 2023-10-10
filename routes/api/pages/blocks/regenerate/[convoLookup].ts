import { Handlers } from "$fresh/server.ts";
import {
  ConvoState,
  LLM,
  Personalities,
  Portrayals,
} from "../../../../../src/services.ts";
import {
  ConversationMessage,
  FunctionToCall,
  PageBlock,
} from "@fathym/synaptic";
import { PortrayalsPersonality } from "../../../../../src/personalities.config.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    const personality = await Personalities.Provide(PortrayalsPersonality);

    const messages = (await ConvoState.History(convoLookup)) || [];

    const apiReq: { command: string; portrayal: PageBlock } = await req
      .json();

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
      o.name === apiReq.portrayal.Type
    );

    // const azureSearchIndexName = Deno.env.get("AZURE_SEARCH_INDEX_NAME");

    const chatResp = await LLM.Chat(personality, messages, {
      Model: "gpt-4-32k",
      // Extensions: loadAzureExtensionOptions(azureSearchIndexName!),
      FunctionRequired: 0,
      Functions: [options[currentOptionIndex]],
    }) as FunctionToCall;

    const body = JSON.stringify({
      ...apiReq.portrayal,
      Details: chatResp.arguments,
      Type: chatResp.name,
    } as PageBlock);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
};
