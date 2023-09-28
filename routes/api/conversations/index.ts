import { Handlers } from "$fresh/server.ts";
import { ConvoState } from "../../../state-flow/database.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const convos = (await ConvoState.GetAll()) || {};

    const body = JSON.stringify(convos);

    return new Response(body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
};
