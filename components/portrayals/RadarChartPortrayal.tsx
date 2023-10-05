import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type RadarChartPortrayalProps = Omit<ChartPortrayalProps, "type" | "options"> & {
};

export function RadarChartPortrayal(props: RadarChartPortrayalProps) {
  return (
    <ChartPortrayal type="radar" options={{}} {...props} />
  );
}
