import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";
import { curIconSetGenerateConfig } from "./fathym-atomic-icons.config.ts";
import { iconSetPlugin } from "@fathym/atomic-icons";
import { createGitHubOAuth2Client } from "https://deno.land/x/deno_kv_oauth@v0.6.1/mod.ts";
import { kvOAuthPlugin } from "https://deno.land/x/deno_kv_oauth@v0.6.1/fresh.ts";

const oauth2Client = createGitHubOAuth2Client();

export default defineConfig({
  plugins: [
    twindPlugin(twindConfig),
    await iconSetPlugin(curIconSetGenerateConfig),
    kvOAuthPlugin(oauth2Client),
  ],
});
