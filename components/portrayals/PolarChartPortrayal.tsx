import { ChartPortrayal, ChartPortrayalProps } from "./ChartPortrayal.tsx";

export type PolarChartPortrayalProps = Omit<ChartPortrayalProps, "type" | "options"> & {
};

export function PolarChartPortrayal(props: PolarChartPortrayalProps) {
  return (
    <ChartPortrayal type="polarArea" options={{}} {...props} />
  );
}
