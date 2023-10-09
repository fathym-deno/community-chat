import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import { iconSetPlugin } from "@fathym/atomic-icons";
import { kvOauthPlugin } from "@fresh_kv_oauth";
import { synapticPlugin } from "@fathym/synaptic";
import twindConfig from "./twind.config.ts";
import { curIconSetGenerateConfig } from "./fathym-atomic-icons.config.ts";
import { kvAuthOptions } from "./kv-auth.config.ts";
import { synapticConfig } from "./fathym-synaptic.config.ts";

export const synapticPluginDef = synapticPlugin(synapticConfig);

export default defineConfig({
  plugins: [
    twindPlugin(twindConfig),
    await iconSetPlugin(curIconSetGenerateConfig),
    kvOauthPlugin(kvAuthOptions),
    synapticPluginDef.Plugin,
  ],
});
