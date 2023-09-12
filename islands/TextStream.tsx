import { type Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface TextStreamProps {
}

export default function TextStream(props: TextStreamProps) {
  const content = useSignal("");

  let executed = false;

  // function stream() {
  useEffect(() => {
    const es = new EventSource(
      "/api/openaistream/gpt-35-turbo",
    );
    console.log("pre: " + es.readyState);
    es.onopen = () => {
      console.log("start: " + es.readyState);
    };
    es.onerror = (err) => {
      console.log(err);
    };
    es.onmessage = (ev: MessageEvent<string>) => {
      // content.value += ev.choice.delta?.content;
      // console.log(ev.data);
      if (ev.data === "[DONE]") {
        es.close();
      } else {
        content.value += ev.data;
      }
      // console.log(ev);
      // console.log("msg: " + es.readyState);
    };
    return () => {
      console.log("end: " + es.readyState);
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
