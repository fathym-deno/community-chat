import { useState } from 'react';
import { useRouter } from 'next/router';
import { createConversation } from '../../state-flow/database.ts';

export default function NewConversation() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const convoId = await createConversation({ title });
    router.push(`/dashboard/${convoId}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">New Conversation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded mb-4"
          placeholder="Conversation title"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}