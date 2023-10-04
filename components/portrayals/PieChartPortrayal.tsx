import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type PieChartPortrayalProps = Omit<ChartPortrayalProps, "type">;

export function PieChartPortrayal(props: PieChartPortrayalProps) {
  return (
    <ChartPortrayal type="pie" {...props} />
  );
}
