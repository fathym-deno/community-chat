import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { DeleteIcon } from "$fathym/atomic-icons";
import { Page } from "@fathym/synaptic";

interface PageItemProps {
  page: Page;
}

export function PageItem(props: PageItemProps) {
  const [reload, setReload] = useState(false);

  const { page } = props;

  const handleDelete = async (pageLookup: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this page: ${pageLookup}?`,
      )
    ) {
      await fetch(`/api/pages/${pageLookup}`, {
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
        href={`/dashboard/reports/${page.Lookup}`}
        class="text-blue-500 hover:underline"
      >
        {page.Name} ({page.Lookup})
      </a>

      <button
        class="ml-2"
        onClick={() => {
          handleDelete(page.Lookup).then();
        }}
      >
        <DeleteIcon class="w-6 h-6 text-red-500" />
      </button>
    </>
  );
}
