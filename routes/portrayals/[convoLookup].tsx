import { Handlers } from "$fresh/server.ts";
import { PortrayalManager } from "../../src/PortrayalManager.ts";

const portrayalManager = new PortrayalManager();

export const handler: Handlers = {
  async POST(req, ctx) {
    const portrayal = await req.json();
    portrayalManager.savePortrayal(portrayal);

    return ctx.redirect(`/dashboard/${req.params.convoLookup}`);
  },
};