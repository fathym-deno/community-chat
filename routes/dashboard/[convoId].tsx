// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from "$fresh/server.ts";
import { ConversationMessage } from "../../state-flow/database.ts";
import { handler as openAiSvc } from "../api/conversations/chat/[convoId].ts";
import { ChatHistory } from "../../islands/ChatHistory.tsx";
import { SendIcon } from "../../build/iconset/icons/SendIcon.tsx";
import { ChatInput } from "../../islands/ChatInput.tsx";
import { useEffect, useState } from "preact/hooks";

export const handler: Handlers = {
  async GET(req, ctx) {
    ctx.params.deploymentId = "gpt-35-turbo-16k";

    const resp = await openAiSvc.GET!(req, ctx);

    const messagesData: { key: KeyType; value: ConversationMessage }[] =
      await resp.json();

    const messages: ConversationMessage[] = messagesData.map((md) => md.value);

    messages.unshift({
      From: "assistant",
      Content:
        "Welcome to Harbor Research, providing AI powered industry knowledge.",
    });

    return ctx.render({
      convoId: ctx.params.convoId,
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
  const chatPostSrc = `/dashboard/${props.data.convoId}`;
  function onMessageStreamed() {
    // location.href = location.href;
  }

  return (
    <div>
      <ChatHistory
        convoId={props.data.convoId}
        messages={props.data.messages}
        userMessage={props.data.newUserMessage}
        messageStreamed={onMessageStreamed}
      />

      <ChatInput postSrc={chatPostSrc} />
    </div>
  );
}
