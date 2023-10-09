import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { DeleteIcon } from "$fathym/atomic-icons";
import { Report } from "../src/ReportManager.ts";

interface ReportItemProps {
  report: Report;
}

export function ReportItem(props: ReportItemProps) {
  const [reload, setReload] = useState(false);

  const { report } = props;

  const handleDelete = async (reportLookup: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this report: ${reportLookup}?`,
      )
    ) {
      await fetch(`/api/reports/${reportLookup}`, {
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
        href={`/dashboard/reports/${report.Lookup}`}
        class="text-blue-500 hover:underline"
      >
        {report.Name} ({report.Lookup})
      </a>

      <button
        class="ml-2"
        onClick={() => {
          handleDelete(report.Lookup).then();
        }}
      >
        <DeleteIcon class="w-6 h-6 text-red-500" />
      </button>
    </>
  );
}
