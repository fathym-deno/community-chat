import { Handlers } from "$fresh/server.ts";
import { Portrayals } from "../../../../src/services.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const block = await Portrayals.Get(ctx.params.blockLookup);

    const body = JSON.stringify(block);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const blockLookup = ctx.params.blockLookup;

    await Portrayals.Delete(blockLookup);

    return new Response(null, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
