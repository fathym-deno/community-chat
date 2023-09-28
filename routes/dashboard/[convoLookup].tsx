// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import { handler as openAiSvc } from "../api/conversations/chat/[convoLookup].ts";
import { ChatHistory } from "../../islands/ChatHistory.tsx";
import { SendIcon } from "../../build/iconset/icons/SendIcon.tsx";
import { ChatInput } from "../../islands/ChatInput.tsx";
import { PortrayalForm } from "../../islands/PortrayalForm.tsx";
import { useEffect, useState } from "preact/hooks";
import { ConversationMessage } from "@fathym/synaptic";
import { Portrayals } from "../../src/PortrayalManager.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    ctx.params.deploymentId = "gpt-35-turbo-16k";

    const resp = await openAiSvc.GET!(req, ctx);

    const messages: ConversationMessage[] =
      await resp.json();

    messages.unshift({
      From: "assistant",
      Content:
        "Welcome to Harbor Research, providing AI powered industry knowledge."
    });

    return ctx.render({
      convoLookup: ctx.params.convoLookup,
      messages: messages,
      newUserMessage: ctx.params.newUserMessage,
      portrayalOptions: await Portrayals.Options()
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    ctx.params.newUserMessage = form.get("content")?.toString() || "";

    return handler.GET!(req, ctx);
  },
};

export default function Chat(props: PageProps) {
  const chatPostSrc = `/dashboard/${props.data.convoLookup}`;
  function onMessageStreamed() {
    // location.href = location.href;
  }

  return (
    <div class="flex flex-col md:flex-row">
      <div class="md:w-2/3">
        <ChatHistory
          convoLookup={props.data.convoLookup}
          messages={props.data.messages}
          userMessage={props.data.newUserMessage}
          messageStreamed={onMessageStreamed}
        />

        <ChatInput postSrc={chatPostSrc} />
      </div>

      <div class="md:w-1/3 my-8 md:(my-0 mx-8) sticky top-0">
        <h2 class="text-2xl">Portrayal Creation</h2>

        <PortrayalForm options={props.data.portrayalOptions} postSrc={`/dashboard/portrayals/${props.data.convoLookup}`} />
      </div>
    </div>
  );
}