import { type Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface TextStreamProps {
}

export default function TextStream(props: TextStreamProps) {
  const content = useSignal("");

  const executed = false;

  // function stream() {
  useEffect(() => {
    const es = new EventSource(
      "/api/openaistream/gpt-35-turbo",
    );
    es.onopen = () => {
      console.log("start");
    };
    if (!executed) {
      es.onmessage = (ev: MessageEvent<string>) => {
        // content.value += ev.choice.delta?.content;
        // console.log(ev.data);
        content.value += ev.data;
      };
    }
    return () => {
      console.log("end");
      es.close();
    };
  }, []);
  // }

  return (
    <div class="flex gap-8 py-6">
      {content}

      {/* <button onClick={() => stream()}>Stream</button> */}
    </div>
  );
}
