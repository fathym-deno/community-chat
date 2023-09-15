import { JSX } from "preact";
import { LovebotIcon } from "../build/iconset/icons/LovebotIcon.tsx";
import { ConversationMessage } from "../state-flow/database.ts";
import { AcademicIcon } from "../build/iconset/icons/AcademicIcon.tsx";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";
import { SendIcon } from "../build/iconset/icons/SendIcon.tsx";
import { classSet } from "@fathym/atomic";

interface BotChatProps {
  children: JSX.Element;

  onSendMessage?: () => void;//(message: ConversationMessage) => void;

  messages: ConversationMessage[];
}

const botData = {
  "role": "assistant",
  "content": "Hello! How can I assist you today?",
  "time": "2 min ago",
  "usericon": <LovebotIcon class="w-6 h-6" />,
};

export function BotChat(props: BotChatProps) {
  const shell = <div class="flex w-full mt-2 space-x-3"></div>;

  return (
    <>
      {/* Mock Chat Start */}
      {props.messages.map((item, index) => (
        (item.From == "user")
          ? (
            <div key={index} class={classSet(shell.props, "ml-auto mr-2 justify-end")}>
              <div>
                <div class="bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 p-3 rounded-l-lg rounded-br-lg">
                  <p class="text-sm">{item.Content}</p>
                </div>
                <span class="text-xs text-gray-500 leading-none">
                  {item.Timestamp}
                </span>
              </div>
              <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 text-blue-600 overflow-clip">
                <div class="flex self-center"><UserIcon class="w-6 h-6" /></div>
              </div>
            </div>
          )
          : (item.From == "coach")
            ? (
              <div key={index} class={classSet(shell.props)}>
                <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 text-green-600">
                  <div class="flex self-center"><AcademicIcon class="w-6 h-6" /></div>
                </div>
                <div>
                  <div class="bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 p-3 rounded-r-lg rounded-bl-lg">
                    <p class="text-sm">{item.Content}</p>
                  </div>
                  <span class="text-xs text-gray-500 leading-none">
                    {item.Timestamp}
                  </span>
                </div>
              </div>
            )
            : (null)
      ))}

      {/* Actual Bot Chat */}
      {props.children && <div>
        <div class="flex w-full mt-2 space-x-3">
          <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-red-600 bg-opacity-10 border border-red-500 border-opacity-40 text-red-600">
            <div class="flex self-center">{botData.usericon}</div>
          </div>
          <div>
            <div class="bg-red-600 bg-opacity-10 border border-red-500 border-opacity-40 p-3 rounded-r-lg rounded-bl-lg">
              <p class="text-sm">{props.children}</p>
            </div>
            <span class="text-xs text-gray-500 leading-none">
              {botData.time}
            </span>
          </div>
        </div>
      </div>}

      {/* Mock Chat Input */}
      <div class="my-3 rounded-md p-3 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40">
        <form onSubmit={() => props.onSendMessage!()}>
          <div className="relative z-0 flex">
            <input
              type="text"
              id="version"
              className="block w-full rounded-sm rounded-r-none border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Ask Thinky..."
            />

            <button
              type="submit"
              for="version"
              className="flex items-center space-x-1 rounded-sm rounded-l-none border border-l-0 border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
            >
              <SendIcon class="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
