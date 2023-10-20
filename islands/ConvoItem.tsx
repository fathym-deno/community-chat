import { DeleteIcon } from '$fathym/atomic-icons';
import { LineItem } from '@harbor/atomic';
import { Button } from 'flowbite-react';
import { MdDeleteForever } from 'react-icons/md';

interface ConvoItemProps {
  convoLookup: string;
}

export function ConvoItem(props: ConvoItemProps) {
  const { convoLookup } = props;

  return (
    <>
      {/* <LineItem
        actionPath={`/dashboard/${convoLookup}`}
        actionText={`${convoLookup}`}
        confirmAction={async () => {
          await fetch(`/api/conversations/${convoLookup}`, {
            method: 'delete',
          });
        }}
        confirmIcon={<DeleteIcon class="w-6 h-6 text-red-500" />}
        confirmText={`Are you sure you want to delete this conversation: ${convoLookup}?`}
      /> */}

      <Button className="mx-2" href={`/dashboard/${convoLookup}`}>
        {convoLookup}
      </Button>

      <Button
        className="mx-2"
        outline
        onclick={async () => {
          if (confirm(`Are you sure you want to delete this conversation: ${convoLookup}?`)) {
            await fetch(`/api/conversations/${convoLookup}`, {
              method: 'delete',
            });
          }

          location.reload();
        }}
      >
        <MdDeleteForever className="h-6 w-6 text-red-500" />
      </Button>
    </>
  );
}
