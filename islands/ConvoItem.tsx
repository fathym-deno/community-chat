import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { DeleteIcon } from "$fathym/atomic-icons";

interface ConvoItemProps {
  convoLookup: string;

  deleteIcon: JSX.Element;
}

export function ConvoItem(props: ConvoItemProps) {
  const [reload, setReload] = useState(false);
  const { convoLookup } = props;

  const handleDelete = async (convoLookup: string) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      await fetch(`/api/conversations/${convoLookup}`, {
        method: "delete",
      });

      setReload(true);
    }
  };

  useEffect(() => {
    if (reload) {
      location.href = location.href;
    }
  }, [reload]);

  return (
    <>
      <a
        href={`/dashboard/${convoLookup}`}
        className="text-blue-500 hover:underline"
      >
        {convoLookup}
      </a>

      <button
        class="ml-2"
        onClick={() => {
          handleDelete(convoLookup).then();
        }}
      >
        <DeleteIcon class="w-6 h-6 text-red-500" />
      </button>
    </>
  );
}
