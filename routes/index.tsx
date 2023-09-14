// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { JSX } from "preact";

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
  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />

        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>

        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>

        <TextStream />

        <Counter count={count} />
      </div>
    </div>
  );
}
