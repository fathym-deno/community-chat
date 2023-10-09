import { JSX } from 'preact';
import { classSet } from '@harbor/atomic';
import { Portrayal } from '../../src/PortrayalManager.ts';
import {
  BarChartPortrayal,
  BubbleChartPortrayal,
  DoughnutChartPortrayal,
  LineChartPortrayal,
  PieChartPortrayal,
  PolarChartPortrayal,
  RadarChartPortrayal,
  ScatterChartPortrayal,
} from '../../islands/_charts.ts';
import { BasicSummaryPortrayal, BulletListPortrayal } from './_molecules.tsx';

type PortrayalViewProps = JSX.HTMLAttributes<HTMLDivElement> & {
  portrayal: Portrayal;
};

export function PortrayalView(props: PortrayalViewProps) {
  const { portrayal } = props;

  return (
    <div {...props} class={classSet(props, 'mb-2')}>
      {portrayal.Type === 'BasicSummaryPortrayal' && (
        <BasicSummaryPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'BulletListPortrayal' && (
        <BulletListPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'BarChartPortrayal' && (
        <BarChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'LineChartPortrayal' && (
        <LineChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'PieChartPortrayal' && (
        <PieChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'DoughnutChartPortrayal' && (
        <DoughnutChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'BubbleChartPortrayal' && (
        <BubbleChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'ScatterChartPortrayal' && (
        <ScatterChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'PolarChartPortrayal' && (
        <PolarChartPortrayal {...portrayal.Details} />
      )}

      {portrayal.Type === 'RadarChartPortrayal' && (
        <RadarChartPortrayal {...portrayal.Details} />
      )}

      {/* <pre>{JSON.stringify(portrayal.details, null, 2)}</pre> */}
    </div>
  );
}
