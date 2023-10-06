import { Handlers } from "$fresh/server.ts";
import { Reports } from "../../../../src/services.ts";
import { Report } from "../../../../src/ReportManager.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const report = await Reports.Get(ctx.params.reportLookup);

    const body = JSON.stringify(report);

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
  async POST(req, _ctx) {
    const report: Report = await req.json();

    const body = JSON.stringify(report);

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
