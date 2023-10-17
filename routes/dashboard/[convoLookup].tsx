import { Handlers, PageProps } from '$fresh/server.ts';
import { ChatHistory, ChatHistoryMessage } from '@harbor/atomic';
import { ChatInput } from '../../islands/_islands.tsx';
import { PortrayalForm } from '../../islands/PortrayalForm.tsx';
import { useEffect, useRef } from 'preact/hooks';
import { ConversationMessage } from '@fathym/synaptic';
import { LovebotIcon, SendIcon, UserIcon } from '$fathym/atomic-icons';
import { PageBlocks } from '../../src/services.ts';
import { synapticPluginDef } from '../../fresh.config.ts';
import { LiveChat } from '../../islands/LiveChat.tsx';

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.ChatConvoLookup.GET!(
      req,
      ctx
    );

    const messages: ConversationMessage[] = await resp.json();

    messages.unshift({
      From: 'assistant',
      Content:
        'Welcome to Harbor Research, providing AI powered industry knowledge.',
    });

    const userMessage: ConversationMessage | undefined = ctx.params
      .newUserMessage
      ? {
        From: 'user',
        Content: ctx.params.newUserMessage,
      }
      : undefined;

    if (userMessage) {
      messages.push(userMessage);
    }

    const chatMessages: ChatHistoryMessage[] = messages.map((msg) => {
      return {
        Content: msg.Content,
        Timestamp: msg.Timestamp,
        JustifyEnd: msg.From === 'user',
        Color: msg.From === 'user' ? 'sky' : 'green',
        Icon:
          msg.From === 'user' ? (
            <UserIcon class="w-6 h-6" />
          ) : (
            <LovebotIcon class="w-6 h-6" />
          ),
      } as ChatHistoryMessage;
    });

    return ctx.render({
      convoLookup: ctx.params.convoLookup,
      messages: chatMessages,
      newUserMessage: ctx.params.newUserMessage,
      functions: await PageBlocks.Functions(),
      useOpenChat: !!ctx.params.useOpenChat,
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    ctx.params.newUserMessage = form.get('content')?.toString() || '';

    ctx.params.useOpenChat = form.get('useOpenChat')?.toString() || '';

    return handler.GET!(req, ctx);
  },
};

export default function Chat(props: PageProps) {
  const chatPostSrc = `/dashboard/${props.data.convoLookup}`;

  return (
    <div class="flex flex-col md:flex-row">
      <div class="md:w-2/3 mx-4">
        <ChatHistory messages={props.data.messages} />

        <LiveChat
          convoLookup={props.data.convoLookup}
          userMessage={props.data.newUserMessage}
          useOpenChat={props.data.useOpenChat}
        />

        <ChatInput
          // icon=">"
          // icon={<SendIcon class="w-6 h-6" />}
          src={chatPostSrc}
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
            functions={props.data.functions}
            regeneratePostSrc={`/api/pages/blocks/regenerate/${props.data.convoLookup}`}
            savePostSrc={`/dashboard/portrayals`}
          />
        </div>
      </div>
    </div>
  );
}
