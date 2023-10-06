import { JSX } from "preact";
import { Portrayal } from "../../src/PortrayalManager.ts";
import { BasicReportPortrayal } from "./BasicReportPortrayal.tsx";
import { BulletListPortrayal } from "./BulletListPortrayal.tsx";
import { BarChartPortrayal } from "./BarChartPortrayal.tsx";
import { LineChartPortrayal } from "./LineChartPortrayal.tsx";
import { PieChartPortrayal } from "./PieChartPortrayal.tsx";
import { DoughnutChartPortrayal } from "./DoughnutChartPortrayal.tsx";
import { BubbleChartPortrayal } from "./BubbleChartPortrayal.tsx";
import { ScatterChartPortrayal } from "./ScatterChartPortrayal.tsx";
import { PolarChartPortrayal } from "./PolarChartPortrayal.tsx";
import { RadarChartPortrayal } from "./RadarChartPortrayal.tsx";
import { classSet } from "@harbor/atomic";

type PortrayalViewProps = JSX.HTMLAttributes<HTMLDivElement> & {
  portrayal: Portrayal;
};

export function PortrayalView(props: PortrayalViewProps) {
  const { portrayal } = props;

  return (
    <div {...props} class={classSet(props, "mb-2")}>
      {portrayal.Type === "BasicReportPortrayal" && (
        <BasicReportPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "BulletListPortrayal" && (
        <BulletListPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "BarChartPortrayal" && (
        <BarChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "LineChartPortrayal" && (
        <LineChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "PieChartPortrayal" && (
        <PieChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "DoughnutChartPortrayal" && (
        <DoughnutChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "BubbleChartPortrayal" && (
        <BubbleChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "ScatterChartPortrayal" && (
        <ScatterChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "PolarChartPortrayal" && (
        <PolarChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === "RadarChartPortrayal" && (
        <RadarChartPortrayal {...portrayal.Details} />
      )}

      {/* <pre>{JSON.stringify(portrayal.details, null, 2)}</pre> */}
    </div>
  );
}
