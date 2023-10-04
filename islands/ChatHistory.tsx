import { ChatBox } from "../islands/ChatBox.tsx";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { SSE } from "npm:sse.js";
import { ConversationMessage } from "@fathym/synaptic";

interface ChatHistoryProps {
  convoLookup: string;
  messages: ConversationMessage[];
  messageStreamed: () => void;
  useOpenChat: boolean;
  userMessage: string;
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
    if (userMessage.value) {
      const es = new SSE(
        `/api/conversations/chat/${props.convoLookup}?useOpenChat=${props.useOpenChat}`,
        {
          payload: props.userMessage,
        },
      );

      es.onmessage = (ev: MessageEvent<string>) => {
        if (ev.data === "[DONE]") {
          es.close();
          location.href = `${location.href}`;
        } else {
          botMessage.value = {
            Content: (botMessage.value?.Content || "") + ev.data,
            From: "assistant",
          };
        }
        // props.messageStreamed();
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
