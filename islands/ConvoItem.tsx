import { JSX } from "preact";
import { deleteConversation } from "../state-flow/database.ts";
import { render } from "$gfm";
import moment from "npm:moment";
import { UserIcon } from "../build/iconset/icons/UserIcon.tsx";
import { LovebotIcon } from "../build/iconset/icons/LovebotIcon.tsx";
import { useEffect, useState } from 'preact/hooks';
import { DeleteIcon } from "$fathym/atomic-icons";

interface ConvoItemProps {
  convoId: string;

  deleteIcon: JSX.Element;
}


export function ConvoItem(props: ConvoItemProps) {
  const [reload, setReload] = useState(false);
  const { convoId } = props;

  const handleDelete = async (convoId: string) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      await fetch(`/api/conversations/${convoId}`, {
        method: "delete",
      })

      setReload(true);
    }
  }

  useEffect(() => {
    if (reload) {
      location.href = location.href;
    }
  }, [reload]);

  return (
    <>
      <a href={`/dashboard/${convoId}`} className="text-blue-500 hover:underline">
        {convoId}
      </a>

      <button class="ml-2" onClick={() => { handleDelete(convoId).then(); }}>
        Delete
      </button>
    </>
  );
}
