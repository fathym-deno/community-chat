import { Handlers, PageProps } from "$fresh/server.ts";
import { PortrayalItem } from "../../../islands/PortrayalItem.tsx";
import { Portrayal } from "../../../src/PortrayalManager.ts";
import { Portrayals } from "../../../src/services.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const portrayals = await Portrayals.List();

    return ctx.render({
      portrayals,
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    const portrayalLookup = form.get('lookup')?.toString()!;

    await Portrayals.Save({
      Name: form.get('name')?.toString()!,
      Lookup: portrayalLookup,
      Type: form.get('type')?.toString()!,
      Details: JSON.parse(form.get('details')?.toString()!),
    });

    const headers = new Headers();
    headers.set('location', `/dashboard/portrayals/${portrayalLookup}`);

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function PortrayalsIndex(props: PageProps) {
  const portrayals = props.data.portrayals as Portrayal[];

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Portrayals</h1>
      <ul>
        {portrayals.map((portrayal) => (
          <li key={portrayal.Lookup} class="mb-2">
            <PortrayalItem portrayal={portrayal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
