import { Handlers } from "$fresh/server.ts";
import {
  Conversation,
  createConversation,
  deleteConversation,
  getConversation,
} from "../../../state-flow/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const convoId = ctx.params.convoId;

    const convo = await getConversation(convoId);

    const body = JSON.stringify(convo);

    return new Response(body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
  async POST(req, ctx) {
    const convoId = ctx.params.convoId;

    const convo: Conversation = await req.json();

    await createConversation(convoId, convo);

    return new Response(JSON.stringify({ Status: "Success" }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const convoId = ctx.params.convoId;

    await deleteConversation(convoId);

    return new Response(JSON.stringify({ Status: "Success" }), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};
