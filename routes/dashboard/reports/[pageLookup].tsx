import { Handlers, PageProps } from '$fresh/server.ts';
import { BasicLayout } from '../../../components/pages/BasicLayout.tsx';
import { FunctionConfig, Page, PageBlock, PageLayoutConfig } from '@fathym/synaptic';
import { synapticPluginDef } from '../../../fresh.config.ts';
import { Action } from '@harbor/atomic';
import { PageLayoutView } from '../../../components/pages/PageLayoutView.tsx';
import { PageBlocks, Pages } from '../../../src/services.ts';

export const handler: Handlers = {
  async GET(req, ctx) {
    const pageResp = await synapticPluginDef.Handlers.PageLookup.GET!(req, ctx);

    const page: Page = await pageResp.json();

    const pageBlockResp = await synapticPluginDef.Handlers.PageBlocks.GET!(req, ctx);

    const pageBlocks = await pageBlockResp.json();

    return ctx.render({
      functions: await PageBlocks.Functions(),
      layouts: await Pages.Layouts(),
      page,
      pageBlocks,
    });
  },
};

export default function PreviewPage(props: PageProps) {
  const page = props.data.page as Page;

  const pageBlocks = props.data.pageBlocks as PageBlock[];

  const functions = props.data.functions as FunctionConfig[];

  const layouts = props.data.layouts as PageLayoutConfig[];

  return (
    <div class="container mx-auto p-4">
      <div class="flex flex-row justify-between">
        <h1 class="text-2xl font-bold mb-4">
          {page.Name} ({page.Lookup})
        </h1>

        <Action href={`edit/${page.Lookup}`}>Edit</Action>
      </div>

      <PageLayoutView functions={functions} layouts={layouts} page={page} pageBlocks={pageBlocks} />
    </div>
  );
}
