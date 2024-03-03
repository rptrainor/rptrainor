/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'Montserrat Variable', 'sans-serif'],
				handrawn: ['Delicious Handrawn', 'cursive']
			},
			colors: {
				brand_pink: '#FF1B8D',
				brand_yellow: '#FFDA00',
				brand_blue: '#1BB3FF',
				brand_black: '#181E23'
			}
		}
	},
	plugins: []
}
