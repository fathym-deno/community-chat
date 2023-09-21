// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import PieChart from "../islands/PieChart.tsx";
import { ConversationMessage } from "../state-flow/database.ts";
import { handler as openAiSvc } from "./api/[deploymentId]/conversations/[convoId].ts";
import { useEffect } from "preact/hooks";
import { SSE } from "npm:sse.js";
import { ChatHistory } from "../islands/ChatHistory.tsx";
import { SendIcon } from "../build/iconset/icons/SendIcon.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    ctx.params.deploymentId = "gpt-35-turbo-16k";

    const resp = await openAiSvc.GET!(req, ctx);

    const messagesData: { key: KeyType, value: ConversationMessage }[] = await resp.json();

    const messages: ConversationMessage[] = messagesData.map((md) => md.value);

    messages.unshift({
      From: "assistant",
      Content: "Welcome to Harbor Research, providing AI powered industry knowledge."
    });

    return ctx.render({
      convoId: ctx.params.convoId,
      messages: messages,
      newUserMessage: ctx.params.newUserMessage,
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    ctx.params.newUserMessage = form.get("content")?.toString() || '';

    return handler.GET!(req, ctx);
  },
};

export default function Chat(props: PageProps) {
  return (
    <div>
      <ChatHistory convoId={props.data.convoId} messages={props.data.messages} userMessage={props.data.newUserMessage} />

      {/* Mock Chat Input */}
      <form method="post" class="my-3 rounded-md p-3 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40">
        <div className="relative z-0 flex">
          <input
            type="text"
            name="content"
            className="block w-full rounded-sm rounded-r-none border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black"
            placeholder="Ask Thinky..."
          />

          <button
            type="submit"
            for="version"
            className="flex items-center space-x-1 rounded-sm rounded-l-none border border-l-0 border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
          >
            <SendIcon class="w-6 h-6" />
          </button>
        </div>
      </form>

    </div>
  );
}