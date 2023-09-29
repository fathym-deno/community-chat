import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { ChartColors, transparentize } from '$fresh_charts/utils.ts';
import { bubbles, color } from '$fresh_charts/examples/utils.ts';
import { type ChartJs } from '$fresh_charts/deps.ts';
import ChartIsland from '../../islands/ChartIsland.tsx';
import { Chart } from '$fresh_charts/island.tsx';
import { render } from '$gfm';

interface BasicReportPortrayalProps {
  abstract: string;

  content: string;

  title: number;
}

export function BasicReportPortrayal(props: BasicReportPortrayalProps) {
  const contentMdx = render(props.content);

  return (
    <div class="justify-center content-center bg-slate-100 dark:bg-slate-900 justify-center content-center">
      <div class="text-lg font-bold text-slate-700 dark:text-white justify-center content-center">
        {props.title}
      </div>
      <div class="text-sm font-light text-slate-800 dark:text-white">
        {props.abstract}
      </div>
      <div
        class="p-3 pb-6 text-sm font-light"
        dangerouslySetInnerHTML={{ __html: contentMdx }}
      ></div>
    </div>
  );
}
