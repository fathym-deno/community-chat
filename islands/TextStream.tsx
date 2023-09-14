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
        payload:
          "Given the results in Sheri's report for her DISC scores and Motivator scores, give Sheri some career suggestions!?",
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

  return (
    <div
      class="flex gap-8 py-6"
      dangerouslySetInnerHTML={{ __html: content.value }}
    >
    </div>
  );
}
