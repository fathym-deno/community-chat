import { Handlers, PageProps } from "$fresh/server.ts";
import { Action } from "@harbor/atomic";
import { PortrayalItem } from "../../../islands/PortrayalItem.tsx";
import { PageItem } from "../../../islands/PageItem.tsx";
import { Page } from "@fathym/synaptic";
import { Pages } from "../../../src/services.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const pages = await Pages.List();

    return ctx.render({
      pages,
    });
  },
};

export default function PagesIndex(props: PageProps) {
  const pages = props.data.pages as Page[];

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Reports</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.Lookup} class="mb-2">
            <PageItem page={page} />
          </li>
        ))}
      </ul>

      <Action href="/dashboard/reports/new" class="inline-block">
        New Report
      </Action>
    </div>
  );
}
