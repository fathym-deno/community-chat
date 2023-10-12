import { Handlers, PageProps } from '$fresh/server.ts';
import { FunctionConfig, Page, PageLayoutConfig } from '@fathym/synaptic';
import { synapticPluginDef } from "../../../../fresh.config.ts";
import { Action } from "@harbor/atomic";
import { PageLayoutView } from "../../../../components/pages/PageLayoutView.tsx";
import { Pages } from "../../../../src/services.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.PageLookup.GET!(req, ctx);

    // const page: Page = await resp.json();
    const page: Page = {
      Details: {
        columns: 3,
        rowHeight: 150,
      },
      LayoutLookup: 'BasicLayout',
      Lookup: 'test',
      Name: 'Test',
      Slots: [
        {
          PageBlockLookup: 'test',
          Details: {
            ColumnSpan: 1,
            RowSpan: 2,
          },
        },
        {
          PageBlockLookup: 'test2',
          Details: {
            ColumnSpan: 2,
            RowSpan: 1,
          },
        },
        {
          PageBlockLookup: 'test2',
          Details: {
            ColumnSpan: 2,
            RowSpan: 1,
          },
        },
      ],
    };

    return ctx.render({
      layouts: await Pages.Layouts(),
      page,
    });
  },
};

export default function EditPage(props: PageProps) {
  const page = props.data.page as Page;

  const functions = props.data.functions as FunctionConfig[];

  const layouts = props.data.layouts as PageLayoutConfig[];

  return (
    <div class="container mx-auto p-4">
      <div class="flex flex-row justify-between">
        <h1 class="text-2xl font-bold mb-4">
          {page.Name} ({page.Lookup})
        </h1>

        <Action href={`../${page.Lookup}`}>Preview</Action>
      </div>

      {/* <PageLayoutView functions={functions} layouts={layouts} page={page} /> */}
    </div>
  );
}
