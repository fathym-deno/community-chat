import {
  AzureExtensionsOptions,
  ChatCompletions,
} from "npm:@azure/openai@next";

export function loadAzureExtensionOptions(
  indexName: string,
): AzureExtensionsOptions {
  const azureSearchEndpoint = Deno.env.get("AZURE_SEARCH_ENDPOINT");
  const azureSearchAdminKey = Deno.env.get("AZURE_SEARCH_ADMIN_KEY");

  return {
    extensions: [
      {
        type: "AzureCognitiveSearch",
        parameters: {
          endpoint: azureSearchEndpoint,
          key: azureSearchAdminKey,
          indexName: indexName,
        },
      },
    ],
  };
}

export function loadReadableChatStream(
  chatCompletions: AsyncIterable<ChatCompletions>,
) {
  const stream = new ReadableStream({
    async start(controller) {
      // let completeText = "";

      for await (const event of chatCompletions) {
        if (event.choices[0]?.delta?.content) {
          controller.enqueue(`data: ${event.choices[0]?.delta?.content}\n\n`);
        }
      }

      controller.enqueue(`data: [DONE]\n\n`);

      controller.close();
    },
    cancel() {
      // bc.close();
    },
  });

  return stream.pipeThrough(new TextEncoderStream());
}
