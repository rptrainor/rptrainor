import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [db(), tailwind(), solidJs(), sitemap()]
});