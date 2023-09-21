// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import { ConversationMessage } from "../state-flow/database.ts";
import { LayoutIsland } from "../components/Layout.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const result = "";

    return ctx.render(result);
  },
};

export default function Home(props: PageProps) {
  const messages: ConversationMessage[] = [
    {
      From: "system",
      Content:
        "You are an AI assistant that helps people match their skills and personality with potential careers.",
      Timestamp: undefined,
    },
    {
      From: "user",
      Content: "Hello Indigo Career Bot",
      Timestamp: undefined,
    },
    {
      From: "assistant",
      Content: "Hello! Can I help find you a career today?",
      Timestamp: undefined,
    },
    {
      From: "user",
      Content: "Can you help me find a career?",
      Timestamp: undefined,
    },
    // {
    //   From: "coach",
    //   Content: "Please, lets limit it to careers that require 6-month training coarses.",
    //   Timestamp: undefined,
    // },
  ];

  return (
    <>
      <div class="mx-auto flex flex-col">
        <BotChat messages={messages}>
          <TextStream />
        </BotChat>
      </div>
      <div class="mx-auto">
        <LayoutIsland columns={3}></LayoutIsland>
      </div>
    </>
  );
}