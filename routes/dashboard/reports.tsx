import { Handlers, PageProps } from "$fresh/server.ts";
import { LayoutIsland } from "../../components/reports/Layout.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const result = "";

    return ctx.render(result);
  },
};

export default function Home(props: PageProps) {
  return (
    <>
      <div class="mx-auto">
        <LayoutIsland columns={3}></LayoutIsland>
      </div>
    </>
  );
}
