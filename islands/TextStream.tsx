import { type Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { SSE } from "npm:sse.js";

interface TextStreamProps {
}

export default function TextStream(props: TextStreamProps) {
  const content = useSignal("");

  useEffect(() => {
    const es = new SSE(
      "/api/gpt-35-turbo/conversations/test-123",
      {
        payload: "Can you please focus in on the Architect career?",
      },
    );

    es.onmessage = (ev: MessageEvent<string>) => {
      if (ev.data === "[DONE]") {
        es.close();
      } else {
        content.value += ev.data;
      }
    };

    return () => {
      es.close();
    };
  }, []);

  // const es = new EventSource(
  //   "/api/openaistream/gpt-35-turbo",
  //   // { payload: "Hello, world!" },
  // );

  // es.onmessage = (ev: MessageEvent<string>) => {
  //   if (ev.data === "[DONE]") {
  //     es.close();
  //   } else {
  //     content.value += ev.data;
  //   }
  // };

  return (
    <div class="text-sm dark:text-white"
      dangerouslySetInnerHTML={{ __html: content.value }}
    >
    </div>
  );
}
