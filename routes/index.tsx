// deno-lint-ignore-file no-explicit-any
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import TextStream from "../islands/TextStream.tsx";
import { BotChat } from "../components/BotChat.tsx";
import NavbarHarbor from "../islands/NavBarHarbor.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const result = "";

    return ctx.render(result);
  },
};

export default function Home(props: PageProps) {
  return (
    <div class="mx-auto dark:bg-gray-900">
      <div class="mx-auto flex flex-col">
        <NavbarHarbor />
        <BotChat>
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
        <p>Global Automation Market By Product</p>
                <Chart
          type="pie"
          options={{
            devicePixelRatio: 1,
          }}
          data={{
            labels: ['PLM', 'ERP', 'MES', 'SCADA', 'PLC', 'DCS', 'Other software', 'Robotics', 'Machine Vision', 'Sensors', 'Relays & Switches', 'Motors & Drives', 'Other'],
            datasets: [{
              label: "Sessions",
              data: [21, 14, 4, 13, 5, 9, 3, 5, 5, 6, 3, 11, 1],
              borderColor: [  
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
            ], 
              backgroundColor: [  
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
            ],
              borderWidth: 1,
            }],
          }}
        />
      </div>
    </div>
  );
}