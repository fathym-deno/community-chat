import { Handlers, PageProps } from "$fresh/server.ts";
import { listConversations, deleteConversation } from "../../state-flow/database.ts";
import { useEffect, useState } from 'react';

export const handler: Handlers = {
  async GET(_req, ctx) {
    const conversations = await listConversations();

    return ctx.render({
      conversations,
    });
  },
};

export default function Conversations(props: PageProps) {
  const convoLookups = Object.keys(props.data.conversations);
  const [reload, setReload] = useState(false);

  const handleDelete = async (convoLookup) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(convoLookup);
      setReload(true);
    }
  }

  useEffect(() => {
    if (reload) {
      location.href = location.href;
    }
  }, [reload]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Conversations</h1>
      <ul>
        {convoLookups.map((convoLookup) => (
          <li key={convoLookup} className="mb-2">
            <a href={`/dashboard/${convoLookup}`} className="text-blue-500 hover:underline">
              {convoLookup}
            </a>
            <button onClick={() => handleDelete(convoLookup)}>Delete</button>
          </li>
        ))}
      </ul>
      <a href="/dashboard/new-conversation" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        New Conversation
      </a>
    </div>
  );
}