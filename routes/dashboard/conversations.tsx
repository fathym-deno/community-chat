import { Handlers, PageProps } from "$fresh/server.ts";
import { listConversations } from "../../state-flow/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const conversations = await listConversations();

    return ctx.render({
      conversations,
    });
  },
};

export default function Conversations(props: PageProps) {
  // const convos = props.data.conversations;

  const convoLookups = Object.keys(props.data.conversations);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Conversations</h1>
      <ul>
        {convoLookups.map((convoLookup) => (
          <li key={convoLookup} className="mb-2">
            <a href={`/dashboard/${convoLookup}`} className="text-blue-500 hover:underline">
              {convoLookup}
            </a>
          </li>
        ))}
      </ul>
      <a href="/dashboard/new-conversation" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        New Conversation
      </a>
    </div>
  );
}