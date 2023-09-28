import { Handlers } from "$fresh/server.ts";
import { Conversation } from "@fathym/synaptic";
import { ConvoState } from "../../../state-flow/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    const convo = await ConvoState.Get(convoLookup);

    const body = JSON.stringify(convo);

    return new Response(body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
  async POST(req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    const convo: Conversation = await req.json();

    await ConvoState.Create(convoLookup, convo);

    return new Response(JSON.stringify({ Status: "Success" }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const convoLookup = ctx.params.convoLookup;

    await ConvoState.Delete(convoLookup);

    return new Response(JSON.stringify({ Status: "Success" }), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};
