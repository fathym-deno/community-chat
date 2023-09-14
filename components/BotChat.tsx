import { JSX } from "preact";
import { LovebotIcon } from "../build/iconset/icons/LovebotIcon.tsx";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";
import { AcademicIcon } from "../build/iconset/icons/AcademicIcon.tsx";

interface BotChatProps {
  children: JSX.Element;
}

const chatFillData = [
  {
    "role": "system",
    "content":
      "You are an AI assistant that helps people match their skills and personality with potential careers.",
    "time": "null",
    "usericon": <LovebotIcon class="w-6 h-6" />,
  },
  {
    "role": "currentUser",
    "content": "Hello Indigo Career Bot",
    "time": "1 min ago",
    "usericon": <UserIcon class="w-6 h-6" />,
  },
  {
    "role": "assistant",
    "content": "Hello! Can I help find you a career today?",
    "time": "2 min ago",
    "usericon": <LovebotIcon class="w-6 h-6" />,
  },
  {
    "role": "currentUser",
    "content": "Can you help me find a career?",
    "time": "2 min ago",
    "usericon": <UserIcon class="w-6 h-6" />,
  },
  {
    "role": "Career Coach",
    "content":
      "Please, lets limit it to careers that require 6-month training coarses.",
    "time": "3 min ago",
    "usericon": <AcademicIcon class="w-6 h-6" />,
  },
];

const botData = {
  "role": "assistant",
  "content": "Hello! How can I assist you today?",
  "time": "2 min ago",
  "usericon": <LovebotIcon class="w-6 h-6" />,
};

export function BotChat(props: BotChatProps) {
  return (
    <>
      {/* Mock Chat Start */}
      {chatFillData.map((item, index) => (
        (item.role == "user")
          ? (
            <div key={index}>
              <div class="flex w-full mt-2 space-x-3 ml-auto mr-2 justify-end">
                <div>
                  <div class="bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">{item.content}</p>
                  </div>
                  <span class="text-xs text-gray-500 leading-none">
                    {item.time}
                  </span>
                </div>
                <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 text-blue-600 overflow-clip">
                  <div class="flex self-center">{item.usericon}</div>
                </div>
              </div>
            </div>
          )
          : (item.role == "Career Coach")
            ? (
              <div key={index}>
                <div class="flex w-full mt-2 space-x-3">
                  <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 text-green-600">
                    <div class="flex self-center">{item.usericon}</div>
                  </div>
                  <div>
                    <div class="bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 p-3 rounded-r-lg rounded-bl-lg">
                      <p class="text-sm">{item.content}</p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            )
            : (null)
      ))}

      {/* Actual Bot Chat */}
      <div>
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
      </div>

      {/* Mock Chat Input */}
      <div class="my-3 rounded-md p-3 bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40">
        <form>
          <div className="relative z-0 flex">
            <input
              type="text"
              id="version"
              className="block w-full rounded-sm rounded-r-none border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Ask Thinky..."
            />
            <button
              for="version"
              className="flex items-center space-x-1 rounded-sm rounded-l-none border border-l-0 border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
