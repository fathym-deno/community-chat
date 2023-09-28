import {
  ConfigPersonalityProvider,
  DenoKVConversationState,
  IConversationState,
  OpenAILLMAccessor,
} from "@fathym/synaptic";
import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
import personalities from "./personalities.config.ts";

const kv = await Deno.openKv();

export const ConvoState: IConversationState = new DenoKVConversationState(kv);

const endpoint = Deno.env.get("OPENAI_ENDPOINT") || "";
const azureApiKey = Deno.env.get("OPENAI_API_KEY") || "";

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export const LLM = new OpenAILLMAccessor(client);

export const Personalities = new ConfigPersonalityProvider(personalities);
