import { ConversationMessage } from "../state-flow/database.ts";
import { render } from "$gfm";
import moment from "npm:moment";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";
import { LovebotIcon } from "../build/iconset/icons/LovebotIcon.tsx";

interface ChatBoxProps {
  message: ConversationMessage;
}


export function
  ChatBox(props: ChatBoxProps) {

  const messageMdx = render(props.message.Content);

  return (
    (props.message.From == "user")
      ? (
        <div class="flex w-full mt-2 space-x-3 ml-auto mr-2 justify-end">
          <div>
            <div class="bg-blue-600 bg-opacity-10 border border-blue-500 border-opacity-40 max-w-screen-md md:max-w-screen-lg overflow-auto p-3 rounded-l-lg rounded-br-lg">
              <p class="text-sm" dangerouslySetInnerHTML={{ __html: messageMdx }}></p>
            </div>
            <span class="text-xs text-gray-500 leading-none">
              {moment(props.message.Timestamp).from()}
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
          <div class="flex w-full mt-2 space-x-3">
            <div class="flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 text-green-600">
              <div class="flex self-center">
                {/* <LovebotIcon class="w-6 h-6" /> */}
              </div>
            </div>
            <div>
              <div class="bg-green-600 bg-opacity-10 border border-green-500 border-opacity-40 max-w-screen-md md:max-w-screen-lg overflow-auto p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm" dangerouslySetInnerHTML={{ __html: messageMdx }}></p>
              </div>
              <span class="text-xs text-gray-500 leading-none">
                {moment(props.message.Timestamp).from()}
              </span>
            </div>
          </div>
        )
        : (null)
  );
}
