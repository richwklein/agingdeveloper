module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["google", "react-app"],
  globals: {
    __PATH_PREFIX__: true,
  },
  plugins: ["react", "react-hooks"],
  rules: {
    quotes: [1, "double", "avoid-escape"],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
};
