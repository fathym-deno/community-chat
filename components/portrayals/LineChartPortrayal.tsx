import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type LineChartPortrayalProps = Omit<ChartPortrayalProps, "type" | "options"> & {
};

export function LineChartPortrayal(props: LineChartPortrayalProps) {
  return (
    <ChartPortrayal type="line" options={{}} {...props} />
  );
}
