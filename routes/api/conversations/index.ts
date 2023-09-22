import { Handlers } from "$fresh/server.ts";
import { listConversations } from "../../../state-flow/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const convos = (await listConversations()) || [];

    const body = JSON.stringify(convos);

    return new Response(body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
};
