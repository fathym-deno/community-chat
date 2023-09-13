// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { handler as openAiSvc } from "./api/sse/[deploymentId].ts";
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
    const resp = await openAiSvc.GET!(req, ctx);

    let result = "";

    for await (const chunk of streamAsyncIterator(resp.body)) {
      result += chunk.toString();
    }
    // const resp = await openAiSvc.GET!(req, ctx);

    // const stream = resp.body! as ReadableStream<any>;

    // const reader = stream.getReader();
    // let result = "";

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   for (const choice of value.choices) {
    //     if (choice.delta?.content !== undefined) {
    //       result += choice.delta?.content;
    //     }
    //   }
    // }

    return ctx.render(result);
  },
};

export default function Home(props: PageProps) {

  return (
    <div class="mx-auto">
      <div class="mx-auto flex flex-col">
        <Navbar />
        <BotChat>
          <TextStream />
        </BotChat>
      </div>
    </div>
  );
}
