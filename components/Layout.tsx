import { JSX } from "preact";
import { classSet } from "@fathym/atomic";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import { bubbles, color } from "$fresh_charts/examples/utils.ts";
import { type ChartJs } from "$fresh_charts/deps.ts";
import ChartIsland from "../islands/ChartIsland.tsx";
import { Chart } from "$fresh_charts/island.tsx";

interface LayoutProps {
  columns?: number;
}

const templateData = {
  "reportTitle": "The Rise of Industrial Internet of Things",
  "reportSubhead":
    "Combinations of connected hardware and software assets that drive productive efficiency, augmenting what humans can do and in many cases reducing the need for human intervention.",
  "reportContent":
    "The Industrial Internet of Things (IIoT) is a system of interconnected devices, machines, and sensors that collect and exchange data in an industrial setting [doc1]. The IIoT is part of Industry 4.0, which combines the hardware developed during Industry 3.0 and connects it through communications networks to new analytics and applications made possible by the Internet [doc1]. The IIoT can be used to sense, monitor, and manage industrial output to drive quantifiable return on investment (ROI) results [doc1]. The IIoT's impact can be felt across the entire value chain from raw materials to product and service delivery [doc1].",
  "bulletPointTitle": "Key Innovations in the IIoT",
  "bulletPointSubhead": "IIoT has many important innovations",
  "bulletPointContent": [{
    "title": "Predictive Maintenance",
    "content":
      "Predictive maintenance uses data analytics and machine learning to predict when equipment is likely to fail, allowing for maintenance to be scheduled before a failure occurs .",
  }, {
    "title": "Digital Twins",
    "content":
      "Digital twins are virtual replicas of physical devices or systems that can be used to simulate and optimize performance .",
  }, {
    "title": "1D-CFD Simulation",
    "content":
      "1D-CFD simulation of system level CFD focuses on the entire system rather than on the details of the flow inside a specific component of that system. Industries that can benefit from a 1D CFD Analysis include automotive, aerospace, chemical processing, energy, and oil & gas [doc1][doc4].",
  }, {
    "title": "Software-Defined Testing Systems",
    "content":
      "National Instruments has reinvented its operating model to focus on software-defined testing systems [doc3].",
  }, {
    "title": "Data Analytics and Machine Learning",
    "content":
      "National Instruments has strengthened its software position with the addition of technologies such as data analytics and machine learning [doc3].",
  }],
  "pieChartLabel": "Global Automation Market By Product",
  "pieChartLabels": [
    "PLM",
    "ERP",
    "MES",
    "SCADA",
    "PLC",
    "DCS",
    "Other software",
    "Robotics",
    "Machine Vision",
    "Sensors",
    "Relays & Switches",
    "Motors & Drives",
    "Other",
  ],
  "pieChartData": [
    21,
    14,
    4,
    13,
    5,
    9,
    3,
    5,
    5,
    6,
    3,
    11,
    1,
  ],
  "pieChartBorderColor": [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(75, 192, 192, 1)",
  ],
  "pieChartBackgroundColor": [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(75, 192, 192, 0.5)",
  ],
  "lineChartLabel": "Expected Growth in Industrial Software Market",
  "lineChartLabels": [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ],
  "lineChartData": [
    35.02,
    40.12,
    45.23,
    50.34,
    55.45,
    59.48,
  ],
  "barChartLabel": "Expected Growth in Industrial Software Market",
  "barChartLabels": [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ],
  "barChartData": [
    35.02,
    40.12,
    45.23,
    50.34,
    55.45,
    59.48,
  ],
};

//SCATTER PLOT TEST

{
  /*

const scatterchart = Chart;

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, rmin: 1, rmax: 1, min: -100, max: 100};

const scatterdata = {
  datasets: [
    {
      label: 'Dataset 1',
      data: bubbles(NUMBER_CFG),
      borderColor: ChartColors.Red,
      backgroundColor: transparentize(ChartColors.Red, 0.5),
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: bubbles(NUMBER_CFG),
      borderColor: ChartColors.Orange,
      backgroundColor: transparentize(ChartColors.Orange, 0.5),
      yAxisID: 'y2',
    }
  ]
};

const config = {
  type: 'scatter',
  data: scatterdata,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Scatter Multi Axis Chart'
      }
    },
    scales: {
      y: {
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        position: 'left',
        ticks: {
          color: ChartColors.Red
        }
      },
      y2: {
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        position: 'right',
        reverse: true,
        ticks: {
          color: ChartColors.Blue
        },
        grid: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        }
      }
    }
  },
};

const actions = [
  {
    name: 'Randomize',
    handler(chart: { data }) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = bubbles({count: DATA_COUNT, rmin: 1, rmax: 1, min: -100, max: 100});
      });
      chart.update();
    }
  },
  {
    name: 'Add Dataset',
    handler(chart: { data: { datasets: any[]; }; update: () => void; }) {
      const chartData = chart.data;
      const dsColor = color(chartData.datasets.length);
      const newDataset = {
        label: 'Dataset ' + (chartData.datasets.length + 1),
        backgroundColor: transparentize(dsColor, 0.5),
        borderColor: dsColor,
        data: bubbles({count: DATA_COUNT, rmin: 1, rmax: 1, min: -100, max: 100}),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  {
    name: 'Add Data',
    handler(chart: { data: any; update: () => void; }) {
      const chartData = chart.data;
      if (chartData.datasets.length > 0) {

        for (let index = 0; index < chartData.datasets.length; ++index) {
          chartData.datasets[index].data.push(bubbles({count: 1, rmin: 1, rmax: 1, min: -100, max: 100})[0]);
        }

        chart.update();
      }
    }
  },
  {
    name: 'Remove Dataset',
    handler(chart: { data: { datasets: void[]; }; update: () => void; }) {
      chart.data.datasets.pop();
      chart.update();
    }
  },
  {
    name: 'Remove Data',
    handler(chart: { data: { datasets: any[]; }; update: () => void; }) {
      chart.data.datasets.forEach((dataset: { data: void[]; }) => {
        dataset.data.pop();
      });

      chart.update();
    }
  }
];

  */
}

// END SCATTER PLOT TEST

export function LayoutIsland(props: LayoutProps) {
  const columnsCurrent = props.columns ? props.columns : 2;
  const shell = (
    <div
      class={`grid sm:grid-cols-1 md:grid-cols-${columnsCurrent} md:gap-4 p-4 justify-center content-center`}
    >
    </div>
  );

  return (
    <>
      <div
        class={classSet(
          shell.props,
          "bg-slate-100 dark:bg-slate-900 justify-center content-center",
        )}
      >
        <div>
          <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
            {templateData.reportTitle}
          </div>
          <div class="text-sm font-light text-slate-800 dark:text-white">
            {templateData.reportSubhead}
          </div>
          <div class="p-3 pb-6 text-sm font-light">
            {templateData.reportContent}
          </div>

          <div class="text-md font-bold text-slate-700 dark:text-white justify-center content-center">
            {templateData.bulletPointTitle}
          </div>
          <div class="text-sm font-light text-slate-800 dark:text-white">
            {templateData.bulletPointSubhead}
          </div>
          <div class="p-2">
            <ul>
              {templateData.bulletPointContent.map((bulletPoint, index) => (
                <li key={index}>
                  <div class="text-md mb-1">{bulletPoint.title}</div>
                  <div class="text-xs font-light pl-2 mb-2">
                    {bulletPoint.content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
            {templateData.pieChartLabel}
          </div>
          <div class="text-small font-light mb-4 text-slate-800 dark:text-white">
            Subheading for context commentary
          </div>
          <ChartIsland
            type="pie"
            options={{}}
            data={{
              labels: templateData.pieChartLabels,
              datasets: [{
                label: templateData.pieChartLabel,
                data: templateData.pieChartData,
                borderColor: templateData.pieChartBorderColor,
                backgroundColor: templateData.pieChartBackgroundColor,
                borderWidth: 1,
              }],
            }}
          />
        </div>
        <div>
          <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
            {templateData.lineChartLabel}
          </div>
          <ChartIsland
            type="line"
            options={{
              scales: { y: { ticks: {}, beginAtZero: true } },
            }}
            data={{
              labels: templateData.lineChartLabels,
              datasets: [{
                label: templateData.lineChartLabel,
                data: templateData.lineChartData,
                borderColor: ChartColors.Red,
                backgroundColor: transparentize(ChartColors.Red, 0.5),
                borderWidth: 1,
              }],
            }}
          />
          <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
            Bar Chart Sessions and Users
          </div>
          <ChartIsland
            type="bar"
            options={{
              scales: { y: { ticks: {}, beginAtZero: true } },
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
          <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
            Scatter Plot
          </div>
          <ChartIsland
            type="scatter"
            data={{
              labels: ["1", "2", "3", "4", "5"],
              datasets: [{
                label: "Scatter A",
                data: [123, 234, 200, 168, 93],
                borderColor: ChartColors.Red,
                backgroundColor: transparentize(ChartColors.Red, 0.5),
                borderWidth: 1,
              }, {
                label: "Scatter B",
                data: [346, 233, 123, 68, 300],
                borderColor: ChartColors.Blue,
                backgroundColor: transparentize(ChartColors.Blue, 0.5),
                borderWidth: 1,
              }, {
                label: "Scatter C",
                data: [216, 293, 170, 110, 243],
                borderColor: ChartColors.Yellow,
                backgroundColor: transparentize(ChartColors.Yellow, 0.5),
                borderWidth: 1,
              }],
            }}
          />
        </div>
      </div>
    </>
  );
}
