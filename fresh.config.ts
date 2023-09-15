import { createGitHubOAuth2Client } from "https://deno.land/x/deno_kv_oauth/mod.ts";
import { kvOAuthPlugin } from "https://deno.land/x/deno_kv_oauth/fresh.ts";

const oauth2Client = createGitHubOAuth2Client();

export default {
  plugins: [
    kvOAuthPlugin(oauth2Client),
  ],
};