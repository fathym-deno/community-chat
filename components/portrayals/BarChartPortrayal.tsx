import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type BarChartPortrayalProps = Omit<ChartPortrayalProps, "type" | "options"> & {
};

export function BarChartPortrayal(props: BarChartPortrayalProps) {
  return (
    <ChartPortrayal type="bar" options={{}} {...props} />
  );
}
