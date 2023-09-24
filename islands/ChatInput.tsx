import { ConversationMessage } from "../state-flow/database.ts";
import { render } from "$gfm";
import moment from "npm:moment";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";
import { LovebotIcon } from "../build/iconset/icons/LovebotIcon.tsx";
import { SendIcon } from "$fathym/atomic-icons";
import { useState } from 'react';

interface ChatInputProps {
  postSrc: string;
}

export function ChatInput(props: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(message);
    setMessage('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form method="post" src={props.postSrc} class="my-3 rounded-md p-3 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40" onSubmit={handleSubmit}>
      <div className="relative z-0 flex">
        <textarea
          name="content"
          className="block w-full rounded-sm rounded-r-none border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black"
          placeholder="Ask Thinky..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>

        <button
          type="submit"
          for="version"
          className="flex items-center space-x-1 rounded-sm rounded-l-none border border-l-0 border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
        >
          <SendIcon class="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}
