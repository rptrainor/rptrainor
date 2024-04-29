import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

import partytown from '@astrojs/partytown'

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
		partytown({
			config: {
				forward: [
					['dataLayer.push', { preserveBehavior: true }],
					['posthog.split', { preserveBehavior: true }],
					['posthog.slice', { preserveBehavior: true }],
					['posthog.push', { preserveBehavior: true }],
					['posthog.init', { preserveBehavior: true }],
					['posthog', { preserveBehavior: true }]
				]
			}
		})
	]
})
