// import { Handlers } from "$fresh/server.ts";
// import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
// import {
//   addConversationMessage,
//   ConversationMessage,
// } from "../../../state-flow/database.ts";

// const endpoint = Deno.env.get("OPENAI_ENDPOINT") || "";
// const azureApiKey = Deno.env.get("OPENAI_API_KEY") || "";

// const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

// export const handler: Handlers = {
//   async POST(req, ctx) {
//     const convoLookup = ctx.params.convoLookup;

//     const convoMsg: ConversationMessage = {
//       Content: await req.text(),
//       From: "user",
//     };

//     await addConversationMessage(convoLookup, convoMsg);

//     return await handler.GET!(req, ctx);
//   },
// };
