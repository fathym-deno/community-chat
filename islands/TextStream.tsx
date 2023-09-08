import { type Signal, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect } from "preact/hooks";

interface TextStreamProps {
  stream: ReadableStream<any>;
}

export default async function TextStream(props: TextStreamProps) {
  let content = ""; //useSignal("");

  const reader = props.stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    for (const choice of value.choices) {
      if (choice.delta?.content !== undefined) {
        content += choice.delta?.content;
      }
    }
  }

  return (
    <div class="flex gap-8 py-6">
      {content}
    </div>
  );
}
