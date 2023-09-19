// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors } from "$fresh_charts/utils.ts";
//import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import PieChart from "../islands/PieChart.tsx";
import ChartIsland from "../islands/chart.tsx";
import { ConversationMessage } from "../state-flow/database.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const result = "";

    return ctx.render(result);
  },
};

const chartlabels = ['PLM', 'ERP', 'MES', 'SCADA', 'PLC', 'DCS', 'Other software', 'Robotics', 'Machine Vision', 'Sensors', 'Relays & Switches', 'Motors & Drives', 'Other']
const chartdata = [21, 14, 4, 13, 5, 9, 3, 5, 5, 6, 3, 11, 1]
const bordercolor = [
  'rgba(255, 99, 132, 1)',  
  'rgba(54, 162, 235, 1)',  
  'rgba(255, 206, 86, 1)',  
  'rgba(75, 192, 192, 1)',  
  'rgba(153, 102, 255, 1)',  
  'rgba(255, 159, 64, 1)',  
  'rgba(255, 99, 132, 1)',  
  'rgba(54, 162, 235, 1)',  
  'rgba(255, 206, 86, 1)',  
  'rgba(75, 192, 192, 1)',  
  'rgba(153, 102, 255, 1)',  
  'rgba(255, 159, 64, 1)',  
  'rgba(75, 192, 192, 1)'
]
const backgroundcolor = [
  'rgba(255, 99, 132, 0.2)',  
  'rgba(54, 162, 235, 0.2)',  
  'rgba(255, 206, 86, 0.2)',  
  'rgba(75, 192, 192, 0.2)',  
  'rgba(153, 102, 255, 0.2)',  
  'rgba(255, 159, 64, 0.2)',  
  'rgba(255, 99, 132, 0.2)',  
  'rgba(54, 162, 235, 0.2)',  
  'rgba(255, 206, 86, 0.2)',  
  'rgba(75, 192, 192, 0.2)',  
  'rgba(153, 102, 255, 0.2)',  
  'rgba(255, 159, 64, 0.2)',  
  'rgba(75, 192, 192, 0.2)'
]

export default function Home(props: PageProps) {
  const messages: ConversationMessage[] = [
    {
      From: "system",
      Content:
        "You are an AI assistant that helps people match their skills and personality with potential careers.",
      Timestamp: undefined,
      VersionStamp: ""
    },
    {
      From: "user",
      Content: "Hello Indigo Career Bot",
      Timestamp: undefined,
      VersionStamp: ""
    },
    {
      From: "assistant",
      Content: "Hello! Can I help find you a career today?",
      Timestamp: undefined,
      VersionStamp: ""
    },
    {
      From: "user",
      Content: "Can you help me find a career?",
      Timestamp: undefined,
      VersionStamp: ""
    },
  ];

  return (
    <>
      {/* <div class="mx-auto flex flex-col">
        <BotChat messages={messages}>
          <TextStream />
        </BotChat>
      </div>
      <div class="p-4 mx-auto max-w-screen-md"> */}
      <ChartIsland
          type="line"
          options={{
            scales: { y: { beginAtZero: true } },
          }}
          data={{
            labels: ["1", "2", "3"],
            datasets: [
              {
                label: "Sessions",
                data: [123, 234, 234],
                borderColor: ChartColors.Red,
                borderWidth: 1,
              },
              {
                label: "Users",
                data: [346, 233, 123],
                borderColor: ChartColors.Blue,
                borderWidth: 1,
              },
            ],
          }}
        />
      <p>Global Automation Market By Product</p>
        <ChartIsland
          type="pie"
          options={{
            devicePixelRatio: 1,
          }}
          data={{
            labels: chartlabels,
            datasets: [{
              label: "Sessions",
              data: chartdata,
              borderColor: bordercolor, 
              backgroundColor: backgroundcolor,
              borderWidth: 1,
            }],
          }}
        />
        {/* <PieChart />
      </div> */}
    </>
  );
}