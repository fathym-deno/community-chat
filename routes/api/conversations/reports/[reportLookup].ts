import { Handlers } from "$fresh/server.ts";
import {
  ConvoState,
  LLM,
  Personalities,
  Reports,
} from "../../../../src/services.ts";
import { ConversationMessage, FunctionToCall } from "@fathym/synaptic";
import { Report } from "../../../../src/ReportManager.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const report = await Reports.Get(ctx.params.reportLookup);

    return ctx.render({
      report,
    });
  },
  async POST(req, ctx) {
    const reportLookup = ctx.params.reportLookup;

    const body = JSON.stringify({
      // ...apiReq.report,
      // details: chatResp.arguments,
      // type: chatResp.name,
    } as Report);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async DELETE(_req, ctx) {
    const reportLookup = ctx.params.reportLookup;

    await Reports.Delete(reportLookup);

    return new Response(null, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
