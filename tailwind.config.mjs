/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat Variable', ...defaultTheme.fontFamily.sans],
        handrawn: ['Delicious Handrawn', ...defaultTheme.fontFamily.sans],
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
