import {
  ConfigPersonalityProvider,
  DenoKVConversationState,
  IConversationState,
  OpenAILLMAccessor,
  PageBlockManager,
  PageManager,
} from "@fathym/synaptic";
import { AzureKeyCredential, OpenAIClient } from "npm:@azure/openai@next";
import personalities from "./personalities.config.ts";
import { existsSync } from "@fathym/common";
import { dirname } from "$std/path/mod.ts";
import { loadHarborFunctions } from "./functions.config.ts";

const endpoint = Deno.env.get("OPENAI_ENDPOINT") || "";
const azureApiKey = Deno.env.get("OPENAI_API_KEY") || "test";
const denoKvPath = Deno.env.get("DENO_KV_PATH") || undefined;

if (denoKvPath && !existsSync(denoKvPath)) {
  const path = dirname(denoKvPath);

  Deno.mkdirSync(path);
}

const kv = await Deno.openKv(denoKvPath);

const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

export const ConvoState: IConversationState = new DenoKVConversationState(kv);

export const LLM = new OpenAILLMAccessor(client);

export const Personalities = new ConfigPersonalityProvider(personalities);

export const Portrayals = new PageBlockManager(kv, loadHarborFunctions());

export const Pages = new PageManager(kv);
