import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [tailwind(), sitemap()]
});