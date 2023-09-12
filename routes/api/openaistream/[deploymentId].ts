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

    const azureSearchEndpoint = "https://thinky-ai-prd.search.windows.net";
    const azureSearchAdminKey =
      "mlDyZna3Q5nBuJoKa5KHRaAlzWvkj8M8TGeZgUXzLDAzSeCqxhTk";
    const azureSearchIndexName = "harbor-aug27";

    const chatCompletions = await client.listChatCompletions(deploymentId, [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      { role: "user", content: "Hello, assistant!" },
      { role: "user", content: "Please tell me a story!" },
    ], {
      // azureExtensionOptions: {
      //   extensions: [
      //     {
      //       type: "AzureCognitiveSearch",
      //       parameters: {
      //         endpoint: azureSearchEndpoint,
      //         key: azureSearchAdminKey,
      //         indexName: azureSearchIndexName,
      //       },
      //     },
      //   ],
      // },
    });

    const stream = new ReadableStream({
      async start(controller) {
        // let completeText = "";

        for await (const event of chatCompletions) {
          if (event.choices[0]?.delta?.content) {
            // completeText += event.choices[0]?.delta?.content;

            // controller.enqueue(`data: ${completeText}\n\n`);
            controller.enqueue(`data: ${event.choices[0]?.delta?.content}\n\n`);
          }
        }
        controller.close();
      },
    });

    const body = stream.pipeThrough(new TextEncoderStream());

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
};
