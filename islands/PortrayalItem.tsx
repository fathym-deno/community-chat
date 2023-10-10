import { DeleteIcon } from "$fathym/atomic-icons";
import { PageBlock } from "@fathym/synaptic";
import { LineItem } from "@harbor/atomic";

interface PortrayalItemProps {
  portrayal: PageBlock;
}

export function PortrayalItem(props: PortrayalItemProps) {
  const { portrayal } = props;

  return (
    <LineItem
      actionPath={`/dashboard/portrayals/${portrayal.Lookup}`}
      actionText={`${portrayal.Name} (${portrayal.Lookup})`}
      confirmAction={() => {
        fetch(`/api/pages/blocks/${portrayal.Lookup}`, {
          method: 'delete',
        }).then();
      }}
      confirmIcon={<DeleteIcon class="w-6 h-6 text-red-500" />}
      confirmText={`Are you sure you want to delete this portrayal: ${portrayal.Lookup}?`}
    />
  );
}
