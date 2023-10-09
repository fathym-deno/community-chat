import { Handlers, PageProps } from "$fresh/server.ts";
import { ChatHistory } from "../../islands/ChatHistory.tsx";
import { ChatInput } from "../../islands/_islands.tsx";
import { PortrayalForm } from "../../islands/PortrayalForm.tsx";
import { useEffect, useRef } from "preact/hooks";
import { ConversationMessage } from "@fathym/synaptic";
import { SendIcon } from "$fathym/atomic-icons";
import { Portrayals } from "../../src/services.ts";
import { synapticPluginDef } from "../../fresh.config.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.ChatConvoLookup.GET!(req, ctx);

    const messages: ConversationMessage[] = await resp.json();

    messages.unshift({
      From: "assistant",
      Content:
        "Welcome to Harbor Research, providing AI powered industry knowledge.",
    });

    return ctx.render({
      convoLookup: ctx.params.convoLookup,
      messages: messages,
      newUserMessage: ctx.params.newUserMessage,
      useOpenChat: !!ctx.params.useOpenChat,
      portrayalOptions: await Portrayals.Options(),
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    ctx.params.newUserMessage = form.get("content")?.toString() || "";

    ctx.params.useOpenChat = form.get("useOpenChat")?.toString() || "";

    return handler.GET!(req, ctx);
  },
};

export default function Chat(props: PageProps) {
  const chatPostSrc = `/dashboard/${props.data.convoLookup}`;
  const chatInputRef = useRef<HTMLFormElement>(null);

  function onMessageStreamed() {
    chatInputRef.current!.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    chatInputRef.current!.scrollIntoView({ behavior: "smooth" });
    console.log(chatInputRef.current!);
  }, []);

  return (
    <div class="flex flex-col md:flex-row">
      <div class="md:w-2/3 mx-4">
        <ChatHistory
          convoLookup={props.data.convoLookup}
          messages={props.data.messages}
          userMessage={props.data.newUserMessage}
          useOpenChat={props.data.useOpenChat}
          messageStreamed={() => onMessageStreamed()}
        />

        <ChatInput
          // icon=">"
          // icon={<SendIcon class="w-6 h-6" />}
          src={chatPostSrc}
          ref={chatInputRef}
          useOpenChat={props.data.useOpenChat}
        >
          <SendIcon class="w-6 h-6" />
        </ChatInput>
      </div>

      <div class="md:w-1/3 my-8 mx-4 md:(my-0 mx-8) sticky top-0">
        <div class="sticky top-0">
          <h2 class="text-2xl mt-4">Portrayal Creation</h2>

          <PortrayalForm
            convoLookup={props.data.convoLookup}
            options={props.data.portrayalOptions}
            regeneratePostSrc={`/api/portrayals/regenerate/${props.data.convoLookup}`}
            savePostSrc={`/dashboard/portrayals`}
          />
        </div>
      </div>
    </div>
  );
}
