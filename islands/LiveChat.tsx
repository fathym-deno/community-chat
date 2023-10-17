import { Ref, useEffect, useRef } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { SSE } from 'npm:sse.js';
import { ConversationMessage } from '@fathym/synaptic';
import { ChatBox } from '@harbor/atomic';
import { LovebotIcon, UserIcon } from '$fathym/atomic-icons';

interface LiveChatProps {
  convoLookup: string;
  messageStreamed?: () => void;
  useOpenChat: boolean;
  userMessage: string;
}

export function LiveChat(props: LiveChatProps) {
  const botMessage = useSignal<ConversationMessage | undefined>(undefined);
  const liveChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.userMessage) {
      const es = new SSE(
        `/api/conversations/chat/${props.convoLookup}?useOpenChat=${props.useOpenChat}`,
        {
          payload: props.userMessage,
        }
      );

      es.onmessage = (ev: MessageEvent<string>) => {
        if (ev.data === '[DONE]') {
          es.close();

          location.reload();
        } else {
          botMessage.value = {
            Content: (botMessage.value?.Content || '') + ev.data,
            From: 'assistant',
          };
        }

        liveChatRef?.current?.scrollIntoView({ behavior: 'smooth' });
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
      {botMessage.value?.Content && (
        <div ref={liveChatRef}>
          <ChatBox
            color={colors.bot}
            content={botMessage.value.Content}
            icon={icons.bot}
            timestamp={new Date()}
          />
        </div>
      )}
    </>
  );
}
