import { JSX } from 'preact';
import { Action, ActionStyleTypes, Input, classSet } from '@harbor/atomic';
import { Page, PageBlock, PageLayoutSlot } from '@fathym/synaptic';
import { PageBlockView } from '../components/portrayals/PageBlockView.tsx';
import { useState } from 'preact/hooks';
import { DeleteIcon } from '$fathym/atomic-icons';

export type BasicLayoutEditorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  pageBlocks: PageBlock[];

  page: Page;
};

export function BasicLayoutEditor(props: BasicLayoutEditorProps) {
  if (!props.page.Details) {
    props.page.Details = {};
  }

  const [detailsColumns, setDetailsColumns] = useState(
    props.page.Details.columns || 3
  );

  const [detailsRowHeight, setDetailsRowHeight] = useState(
    props.page.Details.rowHeight || undefined
  );

  const [layoutLookup, setLayoutLookup] = useState(
    props.page.LayoutLookup || 'BasicLayout'
  );

  const [lookup, setLookup] = useState(props.page.Lookup);

  const [name, setName] = useState(props.page.Name);

  const [slots, setSlots] = useState(props.page.Slots || []);

  const [hasChanges, setHasChanges] = useState(false);

  const onLookupChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = (e.target as HTMLInputElement)!;

    setLookup(target.value);

    setHasChanges(true);
  };

  const onNameChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = (e.target as HTMLInputElement)!;

    setName(target.value);

    setHasChanges(true);
  };

  const onLayoutLookupChange = (
    e: JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    const target = (e.target as HTMLInputElement)!;

    setLayoutLookup(target.value);

    setHasChanges(true);
  };

  const onDetailsColumnsChange = (
    e: JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    const target = (e.target as HTMLInputElement)!;

    setDetailsColumns(target.value);

    setHasChanges(true);
  };

  const onDetailsRowHeightChange = (
    e: JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    const target = (e.target as HTMLInputElement)!;

    setDetailsRowHeight(target.value);

    setHasChanges(true);
  };

  const onSlotPageBlockChange = (
    e: JSX.TargetedEvent<HTMLSelectElement, Event>,
    index: number
  ) => {
    const target = (e.target as HTMLSelectElement)!;

    const slotChanges = [...slots];

    const curSlot = slotChanges[index];

    curSlot.PageBlockLookup = target.value;

    setSlots(slotChanges);

    setHasChanges(true);
  };

  const onSlotDetailsChange = (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
    fieldKey: string,
    index: number
  ) => {
    const target = (e.target as HTMLInputElement)!;

    const slotChanges = [...slots];

    const curSlot = slotChanges[index];

    if (!curSlot.Details) {
      curSlot.Details = {};
    }

    curSlot.Details[fieldKey] = target.value;

    setSlots(slotChanges);

    setHasChanges(true);
  };

  const addSlot = () => {
    setSlots([
      ...slots,
      {
        PageBlockLookup: '',
        Details: { ColumnSpan: 1, RowSpan: 1 },
      } as PageLayoutSlot,
    ]);

    setHasChanges(true);
  };

  const deleteSlot = (
    e: JSX.TargetedEvent<HTMLButtonElement, Event>,
    index: number
  ) => {
    const slotChanges = [...slots];

    slotChanges.splice(index, 1);

    setSlots(slotChanges);

    setHasChanges(true);
  };

  const saveCore = () => {
    const page: Page = {
      ...props.page,
      Lookup: lookup,
      Name: name,
      LayoutLookup: layoutLookup,
      Slots: slots,
      Details: {
        columns: detailsColumns,
        rowHeight: detailsRowHeight,
      },
    };

    fetch(`/api/pages`, {
      method: 'POST',
      body: JSON.stringify(page),
    })
      .then((response) => {
        setHasChanges(false);
      })
      .catch((error) => { });
  };

  return (
    <div>
      <div class="sticky top-0 flex flex-col md:flex-row justify-evenly p-4 pt-8 bg-slate-700">
        <div class="flex flex-col w-full justify-evenly">
          <div class="flex flex-col md:flex-row justify-evenly">
            <div>
              <label
                htmlFor="lookup"
                class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              >
                Lookup
              </label>

              <Input
                name="lookup"
                value={lookup}
                placeholder="Lookup"
                onChange={onLookupChange}
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="name"
                class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              >
                Name
              </label>

              <Input
                name="name"
                value={name}
                placeholder="Name"
                onChange={onNameChange}
              />
            </div>

            <div>
              <label
                htmlFor="layoutLookup"
                class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              >
                Layout Lookup
              </label>

              <Input
                name="layoutLookup"
                value={layoutLookup}
                placeholder="Layout Lookup"
                onChange={onLayoutLookupChange}
                disabled
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row justify-evenly">
            <div>
              <label
                htmlFor="columns"
                class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              >
                Columns
              </label>

              <Input
                name="columns"
                value={detailsColumns}
                placeholder="Columns"
                onChange={onDetailsColumnsChange}
              />
            </div>

            <div>
              <label
                htmlFor="rowHeight"
                class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              >
                Row Height
              </label>

              <Input
                name="rowHeight"
                value={detailsRowHeight}
                placeholder="Row Height"
                onChange={onDetailsRowHeightChange}
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col [&>*]:my-2">
          <Action
            class="text-slate-300"
            onClick={addSlot}
            actionStyle={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
          >
            Add Slot
          </Action>

          {hasChanges && (
            <Action
              class="disabled:opacity-50 bg-green-500 hover:bg-green-700"
              onClick={saveCore}
              disabled={!hasChanges}
            >
              Save
            </Action>
          )}

          {!hasChanges && (
            <Action
              class={classSet(undefined, hasChanges ? 'opacity-50' : undefined)}
              href={`../${lookup}`}
              onClick={(e: JSX.TargetedEvent<HTMLAnchorElement, Event>) => {
                if (hasChanges) {
                  e.preventDefault();
                }
              }}
            >
              Preview
            </Action>
          )}
        </div>
      </div>

      <div
        {...props}
        class={classSet(
          props,
          `grid grid-cols-1 md:grid-cols-${detailsColumns} md:gap-4 p-4 justify-center content-center`
        )}
      >
        {slots &&
          slots.map((slot, i) => {
            const colSpan = slot.Details.ColumnSpan || 1;

            const rowSpan = slot.Details.RowSpan || 1;

            const rh = detailsRowHeight
              ? detailsRowHeight * rowSpan
              : undefined;

            const pageBlock = props.pageBlocks.find(
              (pb) => pb.Lookup == slot.PageBlockLookup
            );

            return (
              <div
                class={classSet(
                  undefined,
                  rh ? `h-[${rh}px]` : undefined,
                  `md:(col-span-${colSpan} row-span-${rowSpan})`,
                  'flex justify-center align-center'
                )}
              >
                <div class="border border-gray-500 w-full h-[100%] p-2 md:p-4 overflow-auto">
                  <div class="flex flex-row justify-between">
                    <h1 class="pb-4 text-left">
                      {pageBlock ? pageBlock.Name : 'Page block not set'}
                    </h1>

                    <Action
                      onClick={(
                        e: JSX.TargetedEvent<HTMLButtonElement, Event>
                      ) => deleteSlot(e, i)}
                      actionStyle={ActionStyleTypes.None}
                    >
                      <DeleteIcon class="text-red-500 w-6 h-6" />
                    </Action>
                  </div>

                  <div class="flex flex-col justify-evenly w-full">
                    <div class="w-full [&>*]:w-full">
                      <label
                        htmlFor="pageBlock"
                        class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                      >
                        Page Block
                      </label>

                      <select
                        name="pageBlock"
                        class="block w-full rounded-sm border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black mb-2"
                        value={pageBlock?.Lookup || ''}
                        onChange={(e) => onSlotPageBlockChange(e, i)}
                      >
                        <option value="">-- Select Page Block --</option>
                        {props.pageBlocks &&
                          props.pageBlocks.map((pb) => {
                            return <option value={pb.Lookup}>{pb.Name}</option>;
                          })}
                      </select>
                    </div>
                  </div>

                  <div class="flex flex-col justify-evenly w-full">
                    <div class="w-full [&>*]:w-full">
                      <label
                        htmlFor="colSpan"
                        class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                      >
                        Column Span
                      </label>

                      <Input
                        name="colSpan"
                        value={colSpan}
                        placeholder="Columns"
                        onChange={(
                          e: JSX.TargetedEvent<HTMLInputElement, Event>
                        ) => onSlotDetailsChange(e, 'ColumnSpan', i)}
                      />
                    </div>

                    <div class="w-full [&>*]:w-full">
                      <label
                        htmlFor="rowSpan"
                        class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                      >
                        Row Span
                      </label>

                      <Input
                        name="rowSpan"
                        value={rowSpan}
                        placeholder="Row Height"
                        onChange={(
                          e: JSX.TargetedEvent<HTMLInputElement, Event>
                        ) => onSlotDetailsChange(e, 'RowSpan', i)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
