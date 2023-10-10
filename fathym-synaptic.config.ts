import { SynapticConfig } from "@fathym/synaptic";
import {
  HarborPersonality,
  PortrayalsPersonality,
} from "./src/personalities.config.ts";
import {
  ConvoState,
  LLM,
  PageBlocks,
  Pages,
  Personalities,
} from "./src/services.ts";

export const synapticConfig: SynapticConfig = {
  Conversations: {
    ChatPersonalityKey: HarborPersonality,
  },
  Pages: {
    Blocks: {
      RegeneratePersonalityKey: PortrayalsPersonality,
    },
  },
  ConvoState,
  Personalities,
  LLM,
  PageManager: Pages,
  PageBlockManager: PageBlocks,
};
