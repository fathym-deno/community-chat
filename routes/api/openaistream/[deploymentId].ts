import { HandlerContext } from "$fresh/server.ts";
import { OpenAIClient, AzureKeyCredential } from "https://deno.land/x/openai/mod.ts";

const endpoint = Deno.env.get("ENDPOINT") || "";
const azureApiKey = Deno.env.get("AZURE_API_KEY") || "";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const deploymentId = _ctx.params.deploymentId;

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, assistant!" },
  ];

  const chatCompletions = client.listChatCompletions(deploymentId, messages, { maxTokens: 128 });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const event of chatCompletions) {
        controller.enqueue(event);
      }
      controller.close();
    },
  });

  return new Response(stream);
};