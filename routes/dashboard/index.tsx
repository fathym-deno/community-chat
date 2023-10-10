import { Handlers, PageProps } from "$fresh/server.ts";
import { ResetIcon } from "../../build/iconset/icons/ResetIcon.tsx";
import { DeleteIcon } from "$fathym/atomic-icons";
import { ConvoItem } from "../../islands/ConvoItem.tsx";
import { ConvoState } from "../../src/services.ts";
import { useEffect, useState } from "preact/hooks";
import { Action } from "@harbor/atomic";
import { synapticPluginDef } from "../../fresh.config.ts";
import { Conversation } from "@fathym/synaptic";

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
          <li key={convoLookup} class="mb-2">
            <ConvoItem convoLookup={convoLookup} />
          </li>
        ))}
      </ul>
      <Action href="/dashboard/new-conversation" class="inline-block">
        New Conversation
      </Action>
    </div>
  );
}
