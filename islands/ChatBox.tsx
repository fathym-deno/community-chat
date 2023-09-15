import { JSX } from "preact";
import { LovebotIcon } from "../build/iconset/icons/LovebotIcon.tsx";
import { ConversationMessage } from "../state-flow/database.ts";
import { AcademicIcon } from "../build/iconset/icons/AcademicIcon.tsx";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";
import { SendIcon } from "../build/iconset/icons/SendIcon.tsx";
import { classSet } from "@fathym/atomic";

interface ChatBoxProps {
  message: ConversationMessage;
}


export function
  ChatBox(props: ChatBoxProps) {
  return (
    (props.message.From == "user")
      ? (
        <div class="flex w-full max-w-screen-xl mt-2 space-x-3 ml-auto mr-2 justify-end">
          <div>
            <div class="bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 p-3 rounded-l-lg rounded-br-lg">
              <p class="text-sm">{props.message.Content}</p>
            </div>
            <span class="text-xs text-gray-500 leading-none">
              {props.message.Timestamp}
            </span>
          </div>
          <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 text-blue-600 overflow-clip">
            <div class="flex self-center">
              {/* <UserIcon class="w-6 h-6" /> */}
            </div>
          </div>
        </div >
      )
      : (props.message.From == "assistant")
        ? (
          <div class="flex w-full max-w-screen-xl mt-2 space-x-3">
            <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 text-green-600">
              <div class="flex self-center">
                {/* <LovebotIcon class="w-6 h-6" /> */}
              </div>
            </div>
            <div>
              <div class="bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm">{props.message.Content}</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">
                {props.message.Timestamp}
              </span>
            </div>
          </div>
        )
        : (null)
  );
}
