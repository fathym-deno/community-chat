import { Handlers, PageProps } from "$fresh/server.ts";
import { PortrayalView } from "../../../components/portrayals/PortrayalView.tsx";
import { Portrayal, Portrayals } from "../../../src/PortrayalManager.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const portrayal = await Portrayals.Get(ctx.params.portrayalLookup);

    return ctx.render({
      portrayal,
    });
  }
};

export default function PortrayalsIndex(props: PageProps) {
  const portrayal = props.data.portrayal as Portrayal;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">{portrayal.name} ({portrayal.lookup})</h1>

      <PortrayalView class="max-w-screen-md" portrayal={portrayal} />
    </div>
  );
}
