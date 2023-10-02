import {
  ConfigPersonalityProvider,
  DenoKVConversationState,
  IConversationState,
  OpenAILLMAccessor,
} from "@fathym/synaptic";
import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
import personalities from "./personalities.config.ts";

const endpoint = Deno.env.get("OPENAI_ENDPOINT") || "";
const azureApiKey = Deno.env.get("OPENAI_API_KEY") || "";

const kv = await Deno.openKv();

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export const ConvoState: IConversationState = new DenoKVConversationState(kv);

export const LLM = new OpenAILLMAccessor(client);

export const Personalities = new ConfigPersonalityProvider(personalities);
