import {
  AzureExtensionsOptions,
  ChatCompletions,
} from "npm:@azure/openai@next";
import { addConversationMessage } from "../../state-flow/database.ts";

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
  convoId: string,
  chatCompletions: AsyncIterable<ChatCompletions>,
) {
  const stream = new ReadableStream({
    async start(controller) {
      let completeText = "";

      // controller.enqueue(`event: message\n\n`);

      for await (const event of chatCompletions) {
        if (event.choices[0]?.delta?.content) {
          controller.enqueue(`data: ${event.choices[0]?.delta?.content}\n\n`);

          completeText += event.choices[0]?.delta?.content;
        }
      }

      controller.enqueue(`data: [DONE]\n\n`);

      controller.close();

      await addConversationMessage(convoId, {
        From: "assistant",
        Content: completeText,
      });
    },
    cancel() {
      // bc.close();
    },
  });

  return stream.pipeThrough(new TextEncoderStream());
}
