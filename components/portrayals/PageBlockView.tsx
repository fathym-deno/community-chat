import { JSX } from 'preact';
import { classSet } from '@harbor/atomic';
import { FunctionConfig, PageBlock } from '@fathym/synaptic';

type PageBlockViewProps = JSX.HTMLAttributes<HTMLDivElement> & {
  pageBlock: PageBlock;

  functions: FunctionConfig[];
};

export function PageBlockView(props: PageBlockViewProps) {
  const { pageBlock, functions } = props;

  const functionsModuleMap = functions.reduce((map, cur) => {
    map[cur.Definition.name] = cur.Module;

    return map;
    // deno-lint-ignore no-explicit-any
  }, {} as { [type: string]: any });

  const Module = functionsModuleMap[pageBlock.Type];

  return (
    <div {...props} class={classSet(props, 'mb-2')}>
      <Module {...pageBlock.Details} />
    </div>
  );
}
