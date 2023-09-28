import { JSX } from "preact";
import { LovebotIcon } from "../build/iconset/icons/LovebotIcon.tsx";
import { AcademicIcon } from "../build/iconset/icons/AcademicIcon.tsx";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";
import { SendIcon } from "../build/iconset/icons/SendIcon.tsx";
import { classSet } from "@fathym/atomic";
import { ChatBox } from "../islands/ChatBox.tsx";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { SSE } from "npm:sse.js";
import { ConversationMessage } from "@fathym/synaptic";

interface ChatHistoryProps {
  convoLookup: string;

  messages: ConversationMessage[];

  messageStreamed: () => void;

  userMessage: string;
}

function scrollBottom() {
  setTimeout(() => {
    document.querySelector("html"),
      scrollTo(0, document.querySelector("html")!.scrollHeight);
  }, 0);
}

export function ChatHistory(props: ChatHistoryProps) {
  const userMessage = useSignal<ConversationMessage | undefined>(
    props.userMessage
      ? {
        From: "user",
        Content: props.userMessage,
      }
      : undefined,
  );

  const botMessage = useSignal<ConversationMessage | undefined>(undefined);

  useEffect(() => {
    // scrollBottom();

    if (userMessage.value) {
      const es = new SSE(
        `/api/conversations/chat/${props.convoLookup}`,
        {
          payload: props.userMessage,
        },
      );

      es.onmessage = (ev: MessageEvent<string>) => {
        if (ev.data === "[DONE]") {
          es.close();

          // props.messageStreamed();
          location.href = location.href;
        } else {
          botMessage.value = {
            Content: (botMessage.value?.Content || "") + ev.data,
            From: "assistant",
          };
        }

        // scrollBottom();

        return () => {
          es.close();
        };
      };
    }
  }, []);

  return (
    <>
      {props.messages.map((message, index) => {
        return <ChatBox key={index} message={message} />;
      })}

      {userMessage.value?.Content && <ChatBox message={userMessage.value!} />}

      {botMessage.value?.Content && <ChatBox message={botMessage.value!} />}
    </>
  );
}
