import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "@harbor/atomic";
import { PortrayalItem } from "../../../islands/PortrayalItem.tsx";
import { ReportItem } from "../../../islands/ReportItem.tsx";
import { Report } from "../../../src/ReportManager.ts";
import { Reports } from "../../../src/services.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const reports = await Reports.List();

    return ctx.render({
      reports,
    });
  },
};

export default function ReportsIndex(props: PageProps) {
  const reports = props.data.reports as Report[];

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.Lookup} class="mb-2">
            <ReportItem report={report} />
          </li>
        ))}
      </ul>

      <Action href="/dashboard/reports/new" class="inline-block">
        New Report
      </Action>
    </div>
  );
}
