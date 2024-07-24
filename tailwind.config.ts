/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,csj,mjs,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "rgb(var(--color-primary-light) / <alpha-value>)",
          main: "rgb(var(--color-primary-main) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
          contrast: "rgb(var(--color-primary-contrast) / <alpha-value>)",
        },
        secondary: {
          light: "rgb(var(--color-secondary-light) / <alpha-value>)",
          main: "rgb(var(--color-secondary-main) / <alpha-value>)",
          dark: "rgb(var(--color-secondary-dark) / <alpha-value>)",
          contrast: "rgb(var(--color-secondary-contrast) / <alpha-value>)",
        },
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
