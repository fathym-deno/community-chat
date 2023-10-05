import { Handlers, PageProps } from '$fresh/server.ts';
import { handler as portrayalsSvc } from '../../api/conversations/portrayals/[convoLookup]/[portrayalLookup].ts';
import { PortrayalView } from '../../../components/portrayals/PortrayalView.tsx';
import { Portrayal } from '../../../src/PortrayalManager.ts';

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await portrayalsSvc.GET!(req, ctx);

    const portrayal: Portrayal = await resp.json();

    return ctx.render({
      portrayal,
    });
  },
};

export default function PortrayalsIndex(props: PageProps) {
  const portrayal = props.data.portrayal as Portrayal;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">
        {portrayal.Name} ({portrayal.Lookup})
      </h1>

      <PortrayalView class="max-w-screen-md" portrayal={portrayal} />
    </div>
  );
}
