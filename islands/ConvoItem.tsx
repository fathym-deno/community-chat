import { DeleteIcon } from '$fathym/atomic-icons';
import { LineItem } from '@harbor/atomic';

interface ConvoItemProps {
  convoLookup: string;
}

export function ConvoItem(props: ConvoItemProps) {
  const { convoLookup } = props;

  return (
    <>
      <LineItem
        actionPath={`/dashboard/${convoLookup}`}
        actionText={`${convoLookup}`}
        confirmAction={async () => {
          await fetch(`/api/conversations/${convoLookup}`, {
            method: 'delete',
          });
        }}
        confirmIcon={<DeleteIcon class="w-6 h-6 text-red-500" />}
        confirmText={`Are you sure you want to delete this conversation: ${convoLookup}?`}
      />
    </>
  );
}
