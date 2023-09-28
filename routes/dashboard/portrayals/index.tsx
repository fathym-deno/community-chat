import { Handlers, PageProps } from "$fresh/server.ts";
import { Portrayal, Portrayals } from "../../../src/PortrayalManager.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const portrayals = Portrayals.List();

    return ctx.render({
      portrayals,
    });
  },
  async POST(req, ctx) {
    const portrayal = await req.json();
    Portrayals.Save(portrayal);

    const headers = new Headers();
    headers.set("location", `/dashboard/portrayals`);

    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function PortrayalsIndex(props: PageProps) {
  const portrayals = props.data.portrayals as Portrayal[];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Portrayals</h1>
      <ul>
        {portrayals.map((portrayal) => (
          <li key={portrayal.lookup} className="mb-2">
            <div>{portrayal.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
