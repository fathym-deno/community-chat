import { Handlers, PageProps } from "$fresh/server.ts";
import { ResetIcon } from "../../build/iconset/icons/ResetIcon.tsx";
import { DeleteIcon } from "$fathym/atomic-icons";
import { ConvoItem } from "../../islands/ConvoItem.tsx";
import { ConvoState } from "../../src/services.ts";
import { useEffect, useState } from "preact/hooks";
import { Action } from "@harbor/atomic";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const conversations = await ConvoState.GetAll();

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
