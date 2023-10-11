import { Handlers, PageProps } from "$fresh/server.ts";
import { PortrayalView } from "../../../components/portrayals/PortrayalView.tsx";
import { PageBlock } from "@fathym/synaptic";
import { synapticPluginDef } from "../../../fresh.config.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.PageBlockLookup.GET!(req, ctx);

    const block: PageBlock = await resp.json();

    return ctx.render({
      portrayal: block,
    });
  },
};

export default function PortrayalsIndex(props: PageProps) {
  const portrayal = props.data.portrayal as PageBlock;

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">
        {portrayal.Name} ({portrayal.Lookup})
      </h1>

      <PortrayalView class="max-w-screen-md" portrayal={portrayal} />
    </div>
  );
}
