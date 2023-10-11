import { Handlers, PageProps } from "$fresh/server.ts";
import { PageBlock } from "@fathym/synaptic";
import { synapticPluginDef } from "../../../fresh.config.ts";
import { DeleteIcon } from "$fathym/atomic-icons";
import { LineItem } from "../../../islands/_islands.tsx";
import { PortrayalItem } from "../../../islands/PortrayalItem.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.PageBlocks.GET!(req, ctx);

    const blocks: PageBlock[] = await resp.json();

    return ctx.render({
      portrayals: blocks,
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    const portrayalLookup = form.get('lookup')?.toString()!;

    const body = new Request("https://unused.com/", {
      ...req,
      method: "POST",
      body: JSON.stringify({
        Name: form.get('name')?.toString()!,
        Lookup: portrayalLookup,
        Type: form.get('type')?.toString()!,
        Details: JSON.parse(form.get('details')?.toString()!),
      }),
    });

    await synapticPluginDef.Handlers.PageBlocks.POST!(body, ctx);

    const headers = new Headers();
    headers.set('location', `/dashboard/portrayals/${portrayalLookup}`);

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function PortrayalsIndex(props: PageProps) {
  const portrayals = props.data.portrayals as PageBlock[];

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
