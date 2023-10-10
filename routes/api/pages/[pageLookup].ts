import { Handlers } from "$fresh/server.ts";
import { Pages } from "../../../src/services.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const page = await Pages.Get(ctx.params.pageLookup);

    const body = JSON.stringify(page);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async POST(req, _ctx) {
    const page: Page = await req.json();

    const body = JSON.stringify(page);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const pageLookup = ctx.params.pageLookup;

    await Pages.Delete(pageLookup);

    return new Response(null, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
