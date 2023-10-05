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
      {portrayal.type === "BasicReportPortrayal" && (
        <BasicReportPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "BulletListPortrayal" && (
        <BulletListPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "BarChartPortrayal" && (
        <BarChartPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "LineChartPortrayal" && (
        <LineChartPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "PieChartPortrayal" && (
        <PieChartPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "DoughnutChartPortrayal" && (
        <DoughnutChartPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "BubbleChartPortrayal" && (
        <BubbleChartPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "ScatterChartPortrayal" && (
        <ScatterChartPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "PolarChartPortrayal" && (
        <PolarChartPortrayal {...portrayal.details} />
      )}

      {portrayal.type === "RadarChartPortrayal" && (
        <RadarChartPortrayal {...portrayal.details} />
      )}

      {/* <pre>{JSON.stringify(portrayal.details, null, 2)}</pre> */}
    </div>
  );
}
