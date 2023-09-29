import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { ChartColors, transparentize } from '$fresh_charts/utils.ts';
import { bubbles, color } from '$fresh_charts/examples/utils.ts';
import { type ChartJs } from '$fresh_charts/deps.ts';
import ChartIsland from '../../islands/ChartIsland.tsx';
import { Chart } from '$fresh_charts/island.tsx';

interface BulletListPortrayalProps {
  abstract: string;

  bullets: string[];

  title: string;
}

export function BulletListPortrayal(props: BulletListPortrayalProps) {
  return (
    <div
      class="justify-center content-center bg-slate-100 dark:bg-slate-900 justify-center content-center"
    >
      <div class="text-md font-bold text-slate-700 dark:text-white justify-center content-center">
        {props.title}
      </div>
      <div class="text-sm font-light text-slate-800 dark:text-white">
        {props.abstract}
      </div>
      <div class="p-2">
        <ul>
          {props.bullets.map((bulletPoint, index) => (
            <li key={index}>
              {/* <div class="text-md mb-1">{bulletPoint.title}</div> */}
              <div class="text-xs font-light pl-2 mb-2">
                {bulletPoint}
                {/* {bulletPoint.content} */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
