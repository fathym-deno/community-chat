import { type Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface TextStreamProps {
}

export default function TextStream(props: TextStreamProps) {
  const content = useSignal("");

  useEffect(() => {
    const es = new EventSource(
      "/api/openaistream/gpt-35-turbo",
      // { payload: "Hello, world!" },
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
