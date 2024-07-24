/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
