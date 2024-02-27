/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
				Handrawn: ['Handrawn', 'Sans', ...defaultTheme.fontFamily.sans]
			},
      colors: {
        brand_pink: "#FF1B8D",
        brand_yellow: "#FFDA00",
        brand_blue: "#1BB3FF",
        brand_black: "#181E23",
      }
    },
  },
  plugins: [],
};
