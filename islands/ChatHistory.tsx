import { useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { SSE } from 'npm:sse.js';
import { ConversationMessage } from '@fathym/synaptic';
import { ChatBox } from '@harbor/atomic';
import { LovebotIcon, UserIcon } from '$fathym/atomic-icons';
import { JSX } from 'preact';

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
        From: 'user',
        Content: props.userMessage,
      }
      : undefined
  );

  const botMessage = useSignal<ConversationMessage | undefined>(undefined);

  useEffect(() => {
    if (userMessage.value) {
      const es = new SSE(
        `/api/conversations/chat/${props.convoLookup}?useOpenChat=${props.useOpenChat}`,
        {
          payload: props.userMessage,
        }
      );

      es.onmessage = (ev: MessageEvent<string>) => {
        if (ev.data === '[DONE]') {
          es.close();
          location.href = `${location.href}`;
        } else {
          botMessage.value = {
            Content: (botMessage.value?.Content || '') + ev.data,
            From: 'assistant',
          };
        }
        // props.messageStreamed();
        return () => {
          es.close();
        };
      };
    }
  }, []);

  const colors = { user: 'blue', bot: 'green' };

  const icons = {
    user: <UserIcon class="w-6 h-6" />,
    bot: <LovebotIcon class="w-6 h-6" />,
  };

  return (
    <>
      {props.messages.map((message, index) => {
        const color = message.From === 'user' ? colors.user : colors.bot;

        const icon: JSX.Element =
          message.From === 'user' ? icons.user : icons.bot;

        const justifyEnd = message.From === 'user';

        return (
          <ChatBox
            key={index}
            color={color}
            content={message.Content}
            icon={icon}
            justifyEnd={justifyEnd}
            timestamp={message.Timestamp!}
          />
        );
      })}

      {userMessage.value?.Content && (
        <ChatBox
          color={colors.user}
          content={userMessage.value.Content}
          icon={icons.user}
          justifyEnd={true}
          timestamp={new Date()}
        />
      )}

      {botMessage.value?.Content && (
        <ChatBox
          color={colors.bot}
          content={botMessage.value.Content}
          icon={icons.bot}
          timestamp={new Date()}
        />
      )}
    </>
  );
}
