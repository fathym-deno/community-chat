import { type Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface TextStreamProps {
}

export default function TextStream(props: TextStreamProps) {
  // let content = ""; //useSignal("");

  const content = useSignal("");

  useEffect(() => {
    const es = new EventSource(
      "/api/openaistream/gpt-35-turbo",
    );

    es.onmessage = (ev: MessageEvent<string>) => {
      // content.value += ev.choice.delta?.content;
      console.log(ev.data);
      content.value += ev.data;
    };

    return () => es.close();
  }, []);

  return (
    <div class="flex gap-8 py-6">
      {content}
    </div>
  );
}
