import { DeleteIcon } from "$fathym/atomic-icons";
import { Page } from "@fathym/synaptic";
import { LineItem } from "@harbor/atomic";

interface PageItemProps {
  page: Page;
}

export function PageItem(props: PageItemProps) {
  const { page } = props;

  return (
    <LineItem
      actionPath={`/dashboard/reports/${page.Lookup}`}
      actionText={`${page.Name} (${page.Lookup})`}
      confirmAction={async () => {
        await fetch(`/api/pages/${page.Lookup}`, {
          method: 'delete',
        });
      }}
      confirmIcon={<DeleteIcon class="w-6 h-6 text-red-500" />}
      confirmText={`Are you sure you want to delete this page: ${page.Lookup}?`}
    />
  );
}
