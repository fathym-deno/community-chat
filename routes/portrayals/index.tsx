import { Handlers, PageProps } from "$fresh/server.ts";
import { PortrayalManager } from "../../src/PortrayalManager.ts";

const portrayalManager = new PortrayalManager();

export const handler: Handlers = {
  async GET(_req, ctx) {
    const portrayals = portrayalManager.listPortrayals();

    return ctx.render({
      portrayals,
    });
  },
};

export default function Portrayals(props: PageProps) {
  const portrayals = props.data.portrayals;

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
