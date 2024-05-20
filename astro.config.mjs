import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

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
	integrations: [tailwind(), sitemap()]
})
