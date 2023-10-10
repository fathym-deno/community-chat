import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { DeleteIcon } from "$fathym/atomic-icons";
import { PageBlock } from "@fathym/synaptic";

interface PortrayalItemProps {
  portrayal: PageBlock;
}

export function PortrayalItem(props: PortrayalItemProps) {
  const [reload, setReload] = useState(false);

  const { portrayal } = props;

  const handleDelete = async (portrayalLookup: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this portrayal: ${portrayalLookup}?`,
      )
    ) {
      await fetch(`/api/pages/blocks/${portrayalLookup}`, {
        method: "delete",
      });

      setReload(true);
    }
  };

  useEffect(() => {
    if (reload) {
      location.href = `${location.href}`;
    }
  }, [reload]);

  return (
    <>
      <a
        href={`/dashboard/portrayals/${portrayal.Lookup}`}
        class="text-blue-500 hover:underline"
      >
        {portrayal.Name} ({portrayal.Lookup})
      </a>

      <button
        class="ml-2"
        onClick={() => {
          handleDelete(portrayal.Lookup).then();
        }}
      >
        <DeleteIcon class="w-6 h-6 text-red-500" />
      </button>
    </>
  );
}
