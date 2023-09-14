// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import Navbar from "../islands/NavBar.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const result = "";

    return ctx.render(result);
  },
};

export default function Home(props: PageProps) {
  return (
    <div class="mx-auto dark:bg-gray-900">
      <div class="mx-auto flex flex-col">
        <Navbar />
        <BotChat>
          <TextStream />
        </BotChat>
      </div>
    </div>
  );
}
