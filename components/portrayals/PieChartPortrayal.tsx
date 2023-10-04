import ChartIsland from "../../islands/ChartIsland.tsx";

interface PieChartPortrayalProps {
  data: number[];

  labels: string[];

  title: string;
}

export function PieChartPortrayal(props: PieChartPortrayalProps) {
  return (
    <div class="justify-center content-center bg-slate-100 dark:bg-slate-900 justify-center content-center">
      <div>
        <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
          {props.title}
        </div>
        {
          /* <div class="text-small font-light mb-4 text-slate-800 dark:text-white">
          Subheading for context commentary
        </div> */
        }
        <ChartIsland
          type="pie"
          options={{}}
          data={{
            labels: props.labels,
            datasets: [
              {
                label: props.title,
                data: props.data,
                // borderColor: templateData.pieChart.borderColor,
                // backgroundColor: templateData.pieChart.backgroundColor,
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
