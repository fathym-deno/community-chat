// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import PieChart from "../islands/PieChart.tsx";
import { ConversationMessage } from "../state-flow/database.ts";
import { handler as openAiSvc } from "./api/conversations/[deploymentId]/[convoId].ts";
import { useEffect } from "preact/hooks";
import { SSE } from "npm:sse.js";

export const handler: Handlers = {
  async GET(req, ctx) {
    ctx.params.convoId = "test-1234";

    const messages = await openAiSvc.GET!(req, ctx);

    return ctx.render({
      messages: messages
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const content = form.get("content")?.toString();

    ctx.params.convoId = "test-1234";

    const messages = await openAiSvc.GET!(req, ctx);

    return ctx.render({
      messages: messages,
      content: content
    });
  },
};

export default function Test(props: PageProps) {
  const content = useSignal("");

  useEffect(() => {
    const es = new SSE(
      "/api/conversations/gpt-35-turbo/test-123",
      {
        payload: props.data.content,
      },
    );

    es.onmessage = (ev: MessageEvent<string>) => {
      if (ev.data === "[DONE]") {
        es.close();
      } else {
        content.value += ev.data;
      }
    };

    return () => {
      es.close();
    };
  }, []);

  return (
    <div>
      <div>
        {JSON.stringify(props.data.messages)}
      </div>

      <form method="post">
        <input name="chatter"></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}