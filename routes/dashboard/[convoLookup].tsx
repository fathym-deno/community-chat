// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import { handler as openAiSvc } from "../api/conversations/chat/[convoLookup].ts";
import { ChatHistory } from "../../islands/ChatHistory.tsx";
import { SendIcon } from "../../build/iconset/icons/SendIcon.tsx";
import { ChatInput } from "../../islands/ChatInput.tsx";
import { PortrayalForm } from "../../islands/PortrayalForm.tsx";
import { useEffect, useState } from "preact/hooks";
import { ConversationMessage } from "@fathym/synaptic";

export const handler: Handlers = {
  async GET(req, ctx) {
    ctx.params.deploymentId = "gpt-35-turbo-16k";

    const resp = await openAiSvc.GET!(req, ctx);

    const messages: ConversationMessage[] =
      await resp.json();

    messages.unshift({
      From: "assistant",
      Content:
        "Welcome to Harbor Research, providing AI powered industry knowledge.",
    });

    return ctx.render({
      convoLookup: ctx.params.convoLookup,
      messages: messages,
      newUserMessage: ctx.params.newUserMessage,
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
    <div>
      <ChatHistory
        convoLookup={props.data.convoLookup}
        messages={props.data.messages}
        userMessage={props.data.newUserMessage}
        messageStreamed={onMessageStreamed}
      />

      <ChatInput postSrc={chatPostSrc} />

      <PortrayalForm postSrc={`/dashboard/portrayals/${props.data.convoLookup}`} />
    </div>
  );
}
