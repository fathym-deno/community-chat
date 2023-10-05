import { Handlers, PageProps } from '$fresh/server.ts';
import { PortrayalItem } from '../../../islands/PortrayalItem.tsx';
import { Report } from '../../../src/ReportManager.ts';
import { Reports } from '../../../src/services.ts';

export const handler: Handlers = {
  async GET(_req, ctx) {
    const reports = await Reports.List();

    return ctx.render({
      reports,
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    await Reports.Save({
      Name: form.get('name')?.toString()!,
      Lookup: form.get('lookup')?.toString()!,
      Layout: form.get('layout')?.toString()!,
      Slots: JSON.parse(form.get('slots')?.toString()!),
    });

    const headers = new Headers();
    headers.set('location', `/dashboard/portrayals`);

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function ReportsIndex(props: PageProps) {
  const reports = props.data.reports as Report[];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.Lookup} className="mb-2">
            {/* <ReportItem report={report} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
