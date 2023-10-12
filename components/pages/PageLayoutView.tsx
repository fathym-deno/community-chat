import { JSX } from 'preact';
import { classSet } from '@harbor/atomic';
import { FunctionConfig, Page, PageBlock, PageLayoutConfig } from '@fathym/synaptic';

type PageLayoutViewProps = JSX.HTMLAttributes<HTMLDivElement> & {
  functions: FunctionConfig[];

  layouts: PageLayoutConfig[];

  page: Page;

  pageBlocks: PageBlock[];
};

export function PageLayoutView(props: PageLayoutViewProps) {
  const { page, pageBlocks, layouts } = props;

  const layoutsModuleMap = layouts.reduce((map, cur) => {
    map[cur.Lookup] = cur.Module;

    return map;
    // deno-lint-ignore no-explicit-any
  }, {} as { [type: string]: any });

  const Layout = layoutsModuleMap[page.LayoutLookup];

  return (
    <Layout functions={props.functions} pageBlocks={pageBlocks} slots={page.Slots} {...page.Details} />
  );
}
