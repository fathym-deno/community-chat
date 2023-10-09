import { SynapticConfig } from "@fathym/synaptic";
import { HarborPersonality } from "./src/personalities.config.ts";
import { ConvoState, LLM, Personalities } from "./src/services.ts";

export const synapticConfig: SynapticConfig = {
  Conversations: {
    ChatPersonalityKey: HarborPersonality,
  },
  ConvoState,
  Personalities,
  LLM,
};
