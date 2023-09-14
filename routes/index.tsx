// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import Navbar from "../islands/NavBar.tsx";

// deno-lint-ignore no-explicit-any
async function* streamAsyncIterator(stream: any) {
  // Get a lock on the stream
  const reader = stream.getReader();

  try {
    while (true) {
      // Read from the stream
      const { done, value } = await reader.read();
      // Exit if we're done
      if (done) return;
      // Else yield the chunk
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
export const handler: Handlers = {
  async GET(req, ctx) {
    let result = "";

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
