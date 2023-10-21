module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "globals": {
    __PATH_PREFIX__: true,
  },
  "extends": [
    "plugin:react/recommended",
    "google",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "plugins": ["react", "react-hooks"],
  "rules": {
    "quotes": [1, "double", "avoid-escape"],
    "max-len": [
      "error", {
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreStrings": true,
      },
    ],
  },
};
