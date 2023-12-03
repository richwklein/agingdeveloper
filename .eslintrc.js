module.exports = {
  "parser": "babel-eslint",
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "env": {
    "jest": true,
    "node": true,
    "es6": true,
  },
  "globals": {
    graphql: true,
    __PATH_PREFIX__: true,
    __TRAILING_SLASH__: true,
    Promise: true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "google",
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
    },
  },
  "plugins": ["react", "react-hooks"],
  "rules": {
    "quotes": [1, "double", "avoid-escape"],
    "max-len": [
      "error", {
        "code": 100,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreStrings": true,
      },
    ],
  },
};
