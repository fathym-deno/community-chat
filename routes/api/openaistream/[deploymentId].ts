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
    const deploymentId = ctx.params.deploymentId;

    const chatCompletions = await client.listChatCompletions(deploymentId, [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      { role: "user", content: "Hello, assistant!" },
      { role: "user", content: "Please tell me a story!" },
    ]);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const event of chatCompletions) {
          if (event.choices[0]?.delta?.content) {
            controller.enqueue(event.choices[0]?.delta?.content);
          }
        }
        controller.close();
      },
    });
    // const reader = stream.getReader();
    // let result = "";

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   for (const choice of value.choices) {
    //     if (choice.delta?.content !== undefined) {
    //       result += choice.delta?.content;
    //     }
    //   }
    // }

    const body = stream.pipeThrough(new TextEncoderStream());
    // const body = result; //chatCompletions.choices[0].message?.content;

    return new Response(body, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  },
};
