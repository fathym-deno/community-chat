import { HandlerContext, Handlers } from "$fresh/server.ts";
import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
// import OpenAI from "npm:openai";

const endpoint = Deno.env.get("ENDPOINT") || "";
const azureApiKey = Deno.env.get("AZURE_API_KEY") || "";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

// const client = new OpenAI({
//   apiKey: azureApiKey, // defaults to process.env["OPENAI_API_KEY"]
//   baseURL: endpoint,
// });

export const handler: Handlers = {
  async GET(_req, ctx) {
    const bc = new BroadcastChannel("tiles");
    let timerId: number | undefined;

    const body = new ReadableStream({
      async start(controller) {
        controller.enqueue(`retry: 1000\n\n`);

        bc.onmessage = (e) => {
          controller.enqueue(`data: ${JSON.stringify(e.data)}\n\n`);
        };

        async function queueFullUpdate() {
          timerId = undefined;
          try {
            const updates: string[] = [];
            for (let i = 0; i < 5; i++) {
              updates.push(i.toString());
            }

            controller.enqueue(`data: ${JSON.stringify(updates)}\n\n`);
          } finally {
            timerId = setTimeout(queueFullUpdate, 250);
          }
        }

        await queueFullUpdate();
      },
      cancel() {
        bc.close();
        if (typeof timerId === "number") clearInterval(timerId);
      },
    });

    return new Response(body.pipeThrough(new TextEncoderStream()), {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
};
