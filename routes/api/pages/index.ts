import { Handlers } from "$fresh/server.ts";
import { Pages } from "../../../src/services.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const body = JSON.stringify(await Pages.List());

    return new Response(body, {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    });
  },
};
