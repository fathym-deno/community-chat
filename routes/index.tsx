// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import { ConversationMessage } from "../state-flow/database.ts";
import { LayoutIsland } from "../components/Layout.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const result = "";

    return ctx.render(result);
  },
};

export default function Home(props: PageProps) {
  return (
    <>
      <div class="mx-auto flex flex-col">
        {/* TODO: Implement basic sign in form that simply takes a password to confirm */}
      </div>
    </>
  );
}