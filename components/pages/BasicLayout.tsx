import { JSX } from 'preact';
import { classSet } from '@harbor/atomic';
import { FunctionConfig, PageBlock, PageLayoutSlot } from '@fathym/synaptic';
import { PageBlockView } from '../portrayals/PageBlockView.tsx';

export type BasicLayoutProps = JSX.HTMLAttributes<HTMLDivElement> & {
  columns?: number;

  functions: FunctionConfig[];

  pageBlocks: PageBlock[];

  rowHeight?: number;

  slots: PageLayoutSlot[];
};

export function BasicLayout(props: BasicLayoutProps) {
  const { columns, functions, pageBlocks, rowHeight, slots } = props;

  const cols = columns || 2;

  return (
    <>
      <div
        {...props}
        class={classSet(
          props,
          `grid grid-cols-1 md:grid-cols-${cols} md:gap-4 p-4 justify-center content-center`
        )}
      >
        {slots &&
          slots.map((slot) => {
            const colSpan = slot.Details.ColumnSpan || 1;

            const rowSpan = slot.Details.RowSpan || 1;

            const rh = rowHeight ? rowHeight * rowSpan : undefined;

            const pageBlock = pageBlocks.find(pb => pb.Lookup == slot.PageBlockLookup);

            return (
              <div class={classSet(undefined, rh ? `h-[${rh}px]` : undefined, `md:(col-span-${colSpan} row-span-${rowSpan})`)}>
                {pageBlock ? <PageBlockView functions={functions} pageBlock={pageBlock} /> : 'Page block not found'}
              </div>
            );
          })}
      </div>
    </>
  );
}
