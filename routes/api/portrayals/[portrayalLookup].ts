import { Handlers, PageProps } from "$fresh/server.ts";
import { Portrayal } from "../../../src/PortrayalManager.ts";
import { Portrayals } from "../../../src/services.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const portrayal = await Portrayals.Get(ctx.params.portrayalLookup);

    const body = JSON.stringify(portrayal);

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
