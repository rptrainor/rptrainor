import { defineConfig, passthroughImageService } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	site: 'https://rptrainor.com',
	output: 'server',
	prefetch: true,
	image: {
		service: passthroughImageService()
	},
	adapter: cloudflare({
		imageService: 'passthrough'
	}),
	integrations: [
		tailwind({
			applyBaseStyles: true
		}),
		sitemap()
	]
})
