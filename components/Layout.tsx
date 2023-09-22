import { JSX } from "preact";
import { classSet } from "@fathym/atomic";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import { color, bubbles } from "$fresh_charts/examples/utils.ts";
import { type ChartJs } from "$fresh_charts/deps.ts";
import ChartIsland from "../islands/ChartIsland.tsx";
import { Chart } from "$fresh_charts/island.tsx";

interface LayoutProps {
  columns?: number
}

const templateData = {
  "subject": "title",
  "content": "description",
}

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
  'rgba(255, 99, 132, 0.5)',  
  'rgba(54, 162, 235, 0.5)',  
  'rgba(255, 206, 86, 0.5)',  
  'rgba(75, 192, 192, 0.5)',  
  'rgba(153, 102, 255, 0.5)',  
  'rgba(255, 159, 64, 0.5)',  
  'rgba(255, 99, 132, 0.5)',  
  'rgba(54, 162, 235, 0.5)',  
  'rgba(255, 206, 86, 0.5)',  
  'rgba(75, 192, 192, 0.5)',  
  'rgba(153, 102, 255, 0.5)',  
  'rgba(255, 159, 64, 0.5)',  
  'rgba(75, 192, 192, 0.5)'
]

//SCATTER PLOT TEST

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

// END SCATTER PLOT TEST

export function LayoutIsland(props: LayoutProps) {
  const columnsCurrent = props.columns ? props.columns : 2;
  const shell = <div class={`grid sm:grid-cols-1 md:grid-cols-${columnsCurrent} md:gap-4 p-4 justify-center content-center`}></div>

  return (
    <>
      <div class={classSet(shell.props, "bg-slate-100 dark:bg-slate-900 justify-center content-center")}>
        <div>
          <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">Safe Harbor Labratories Information Title</div>
          <div class="text-small font-light text-slate-800 dark:text-white">Subheading for context and being pretty + neat + modern</div>
          <div class="p-3">This is the descriptive section where we give our clients some instructions about what they should do in the world and why. But just to be clear, don't start Ted Airlines.</div>
        </div>
        <div>
          <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">Global Automation Market By Product</div>
          <div class="text-small font-light mb-4 text-slate-800 dark:text-white">Subheading for context commentary</div>
            <ChartIsland
              type="pie" 
              options={{
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
        </div>
        <div>
        <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">Line Chart Users and Sessions</div>
        <ChartIsland
          type="line"
          options={{
            scales: { yaxis: [{ ticks: { beginAtZero: true } }] },
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
        <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">Bar Chart Sessions and Users</div>
        <ChartIsland
          type="bar"
          options={{
            scales: { y: [{ ticks: { beginAtZero: true } }] },
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
        <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">Scatter Plot</div>
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
  )
}