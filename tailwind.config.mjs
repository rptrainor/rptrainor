/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
        sans: ['Montserrat Variable', ...defaultTheme.fontFamily.sans],
      },
			colors: {
				background: '#010203',
				brand_gray: '#222222',
				accent: '#a28834',
				contrast: '#d4af37',
				fast: '#0cce6b',
        avg: '#ffa400',
        slow: '#ff4e42',
			},
			screens: {
				xs: '375px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
			gridTemplateColumns: {
				phi: '1fr 0.618fr 1fr', // Custom grid template with the golden ratio
				thirds: '1fr 1fr 1fr', // Custom grid template with thirds
				'phi-middle': '1fr 1.618fr 1fr'
			},
			gridTemplateRows: {
				phi: '1fr 0.618fr 1fr', // Custom grid template with the golden ratio
				thirds: '1fr 1fr 1fr', // Custom grid template with thirds
				'phi-middle': '1fr 1.618fr 1fr'
			},
			animation: {
				'hover-pop': 'hover-pop 0.5s ease-out',
				'slide-in-right': 'slideInRight 0.5s ease-out forwards',
			},
			keyframes: {
				slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
				'hover-pop': {
					'0%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.07)'
					},
					'100%': {
						transform: 'scale(1)'
					}
				},
			}
		}
	},
	plugins: []
}
