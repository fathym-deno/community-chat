import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type ScatterChartPortrayalProps = Omit<ChartPortrayalProps, "type" | "options"> & {
};

export function ScatterChartPortrayal(props: ScatterChartPortrayalProps) {
  return (
    <ChartPortrayal type="scatter" options={{}} {...props} />
  );
}
