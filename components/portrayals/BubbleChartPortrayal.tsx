import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type BubbleChartPortrayalProps = Omit<
  ChartPortrayalProps,
  "type" | "options"
>;

export function BubbleChartPortrayal(props: BubbleChartPortrayalProps) {
  return <ChartPortrayal type="bubble" options={{}} {...props} />;
}
