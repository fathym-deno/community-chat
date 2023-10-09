import { Handlers, PageProps } from "$fresh/server.ts";
import { handler as reportsSvc } from "../../api/reports/[reportLookup].ts";
import { PortrayalView } from "../../../components/portrayals/PortrayalView.tsx";
import { Report } from "../../../src/ReportManager.ts";
import { LayoutIsland } from "../../../components/reports/Layout.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await reportsSvc.GET!(req, ctx);

    const report: Report = await resp.json();

    return ctx.render({
      report,
    });
  },
};

export default function Report(props: PageProps) {
  const report = props.data.report as Report;

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">
        {report.Name} ({report.Lookup})
      </h1>

      <LayoutIsland />
      {/* <PortrayalView class="max-w-screen-md" portrayal={portrayal} /> */}
    </div>
  );
}
