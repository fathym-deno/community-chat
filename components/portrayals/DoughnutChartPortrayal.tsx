import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type DoughnutChartPortrayalProps = Omit<ChartPortrayalProps, "type" | "options"> & {
};

export function DoughnutChartPortrayal(props: DoughnutChartPortrayalProps) {
  return (
    <ChartPortrayal type="doughnut" options={{}} {...props} />
  );
}
