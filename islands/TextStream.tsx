import { type Signal, useSignal } from "@preact/signals";
import { EventSource } from "https://deno.land/x/eventsource@v0.0.3/mod.ts";

interface TextStreamProps {
}

export default function TextStream(props: TextStreamProps) {
  // let content = ""; //useSignal("");

  const content = useSignal("");

  const es = new EventSource(
    "http://localhost:8000/api/sse/gpt-35-turbo",
  );

  // deno-lint-ignore no-explicit-any
  es.onmessage = (ev: MessageEvent<string>) => {
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
