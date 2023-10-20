import { Handlers, PageProps } from '$fresh/server.ts';
import { Action } from '@harbor/atomic';
import { synapticPluginDef } from '../../fresh.config.ts';
import { Conversation } from '@fathym/synaptic';
import { LineItem } from '../../islands/_islands.tsx';
import { DeleteIcon } from '$fathym/atomic-icons';
import { ConvoItem } from '../../islands/ConvoItem.tsx';
import { Button } from 'flowbite-react';

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await synapticPluginDef.Handlers.Conversations.GET!(req, ctx);

    const conversations: {
      [lookup: string]: Conversation;
    } = await resp.json();

    return ctx.render({
      conversations,
    });
  },
};

export default function Conversations(props: PageProps) {
  const convoLookups = Object.keys(props.data.conversations);

  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Conversations</h1>
      <ul>
        {convoLookups.map((convoLookup) => (
          <li key={convoLookup} class="mb-2 flex flex-row">
            <ConvoItem convoLookup={convoLookup} />
          </li>
        ))}
      </ul>

      <Button href="/dashboard/new-conversation" className="mt-4 inline-block">
        New Conversation
      </Button>
    </div>
  );
}
