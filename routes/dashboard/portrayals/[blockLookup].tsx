import { Handlers, PageProps } from '$fresh/server.ts';
import { PageBlockView } from '../../../components/portrayals/PageBlockView.tsx';
import { FunctionConfig, PageBlock } from '@fathym/synaptic';
import { synapticPluginDef } from '../../../fresh.config.ts';
import { PageBlocks } from '../../../src/services.ts';

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.PageBlockLookup.GET!(
      req,
      ctx
    );

    const block: PageBlock = await resp.json();

    return ctx.render({
      portrayal: block,
      functions: await PageBlocks.Functions(),
    });
  },
};

export default function PortrayalsIndex(props: PageProps) {
  const portrayal = props.data.portrayal as PageBlock;

  const functions = props.data.functions as FunctionConfig[];

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">
        {portrayal.Name} ({portrayal.Lookup})
      </h1>

      <PageBlockView
        class="max-w-screen-md"
        pageBlock={portrayal}
        functions={functions}
      />
    </div>
  );
}
