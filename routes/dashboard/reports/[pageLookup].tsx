import { Handlers, PageProps } from '$fresh/server.ts';
import { LayoutIsland } from '../../../components/pages/Layout.tsx';
import { Page } from '@fathym/synaptic';
import { synapticPluginDef } from "../../../fresh.config.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.PageLookup.GET!(req, ctx);

    const page: Page = await resp.json();

    return ctx.render({
      page,
    });
  },
};

export default function Page(props: PageProps) {
  const page = props.data.page as Page;

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">
        {page.Name} ({page.Lookup})
      </h1>

      <LayoutIsland />
      {/* <PortrayalView class="max-w-screen-md" portrayal={portrayal} /> */}
    </div>
  );
}
