// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { handler as openAiSvc } from "./api/openaistream/[deploymentId].ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { JSX } from "preact";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await openAiSvc!(req, ctx);

    const stream = resp.body! as ReadableStream<any>;

    const Result = TextStream({
      stream: stream,
    });

    return ctx.render(Result);
  },
};

export default function Home(props: PageProps) {
  const count = useSignal(3);

  const Result = props.data;

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
        <Result />
        <Counter count={count} />
      </div>
    </div>
  );
}
