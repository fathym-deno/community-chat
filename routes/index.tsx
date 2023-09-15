// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import NavbarHarbor from "../islands/NavBarHarbor.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import PieChart from "../islands/PieChart.tsx";
import { ConversationMessage } from "../state-flow/database.ts";

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
    {
      From: "coach",
      Content: "Please, lets limit it to careers that require 6-month training coarses.",
      Timestamp: undefined,
    },
  ];

  return (
    <div class="mx-auto dark:bg-gray-900">
      <div class="mx-auto flex flex-col">
        <NavbarHarbor />
        <BotChat messages={messages}>
          <TextStream />
        </BotChat>
      </div>
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart
          type="line"
          options={{
            devicePixelRatio: 1,
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          }}
          data={{
            labels: ["1", "2", "3"],
            datasets: [{
              label: "Sessions",
              data: [123, 234, 234],
              borderColor: ChartColors.Red,
              backgroundColor: transparentize(ChartColors.Red, 0.5),
              borderWidth: 1,
            }, {
              label: "Users",
              data: [346, 233, 123],
              borderColor: ChartColors.Blue,
              backgroundColor: transparentize(ChartColors.Blue, 0.5),
              borderWidth: 1,
            }],
          }}
        />
        <Chart
          type="bar"
          options={{
            devicePixelRatio: 1,
            scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
          }}
          data={{
            labels: ["1", "2", "3"],
            datasets: [{
              label: "Sessions",
              data: [123, 234, 234],
              borderColor: ChartColors.Red,
              backgroundColor: transparentize(ChartColors.Red, 0.5),
              borderWidth: 1,
            }, {
              label: "Users",
              data: [346, 233, 123],
              borderColor: ChartColors.Blue,
              backgroundColor: transparentize(ChartColors.Blue, 0.5),
              borderWidth: 1,
            }],
          }}
        />
        <PieChart />
      </div>
    </div >
  );
}