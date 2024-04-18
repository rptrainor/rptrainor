import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: 'https://rptrainor.com',
	output: 'server',
	prefetch: true,
	adapter: cloudflare({
		imageService: 'passthrough',
		platformProxy: {
      enabled: true
    }
	}),
	integrations: [
		tailwind(),
		sitemap(),
		db(),
		solidJs()
	]
})
