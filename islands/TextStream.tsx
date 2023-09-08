import { type Signal, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/hooks";

interface TextStreamProps {
}

export default function TextStream(props: TextStreamProps) {
  // let content = ""; //useSignal("");

  // const reader = props.stream.getReader();

  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) {
  //     break;
  //   }
  //   for (const choice of value.choices) {
  //     if (choice.delta?.content !== undefined) {
  //       content += choice.delta?.content;
  //     }
  //   }
  // }

  const content = useSignal("");

  const es = new EventSource("/api/openaistream/gpt-35-turbo");

  es.onmessage = (ev) => {
    // content.value += ev.choice.delta?.content;
    console.log(ev);
    content.value = JSON.stringify(ev);
  };
  return (
    <div class="flex gap-8 py-6">
      {content}
    </div>
  );
}
