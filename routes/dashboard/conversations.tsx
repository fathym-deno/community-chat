import { useEffect, useState } from 'react';
import { listConversations } from '../../state-flow/database.ts';
import Link from 'next/link';
import { Conversation } from '../../state-flow/database.ts';

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const convos = await listConversations();
      setConversations(convos);
    };

    fetchConversations();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Conversations</h1>
      <ul>
        {conversations.map((convo, index) => (
          <li key={index} className="mb-2">
            <Link href={`/dashboard/${convo.id}`}> 
              <a className="text-blue-500 hover:underline">{convo.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/dashboard/new-conversation">
        <a className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">New Conversation</a>
      </Link>
    </div>
  );
}