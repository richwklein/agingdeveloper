# Aging Developer

[![Netlify Status](https://api.netlify.com/api/v1/badges/9fff03eb-d9c8-48d1-887d-11aea21246cd/deploy-status)](https://app.netlify.com/sites/agingdeveloper/deploys)

This is the personal site of Richard Klein. It is a static site built using [typescript](https://www.typescriptlang.org/), [astro](https://astro.build/) and [tailwindcss](https://tailwindcss.com/). It is deployed via [netlify](https://www.netlify.com/). You can find a live version of it at [agingdeveloper.com](https://agingdeveloper.com/). See the [github issues](https://github.com/richwklein/agingdeveloper/issues) to track development progress.

## What's in This Document

- [License](#license)
- [Content vs Source Code](#content-vs-source-code)
- [Start local development](#start-local-development)
  - [Create a production build.](#create-a-production-build)
  - [Serve the production build locally.](#serve-the-production-build-locally)
- [VSCode settings](#vscode-settings)
- [Images](#images)
- [Testing](#testing)
- [Disclaimers](#disclaimers)

## License

- The site code is [MIT](/LICENSE) licensed.
- The libraries the site is based upon are MIT, OFL-1.1, or Apache-2.0 licensed.
- Content hosted on the site is
- [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)
  licensed unless otherwise noted.

## Content vs Source Code

Both the source code for the site and the content that is hosted on the site are stored in this repository. The content hosted on the site is located in the `content` folder within the `src` folder. I would like to move this outside of the `src` folder, but using a symlink did not work well when moving from device to device.

## Start local development

Most Typescript developers will likely already have the tools installed, but here is a quick rundown of setting things up just in case you do not. I'm using asdf-vm here to allow multiple versions of tools to be installed at the same time.

1. **Install dev tools**

I use _asdf_ to install dev tools. Use the [getting started](https://asdf-vm.com/guide/getting-started.html) page to make sure it is installed and set up correctly.

Once you have asdf installed you can use that to install node & npm. These are setup as being the global versions, but with asdf you could just use the version locally.

```shell
asdf plugin add nodejs
asdf install nodejs 18.9.1
asdf global nodejs 18.9.1
```

2. **Install dependencies**

```shell
cd agingdeveloper/
npm install
```

This will install local npm dependencies.

## VSCode Settings

VSCode is the main editor that is used on this site. ESLint is used for linting and formatting. These settings are included in the `.vscode` folder in the root of the project. They should be used for a good workflow where lint issues are automatically corrected on save.

```json
{
  "editor.tabCompletion": "on",
  "editor.rulers": [80, 100, 120],
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.configPath": "prettier.config.mjs",
  "prettier.documentSelectors": ["**/*.{js,mjs,cjs,jsx,ts,tsx,md,mdx,astro}"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "eslint.format.enable": false,
  "eslint.lintTask.enable": true
}
```

## Images

Several different size and aspect ratios are used for the cover images on the site. The article cards can have hd video, 3/4, or square aspect ratios depending on the breakpoint. The images are used raw in social media previews, because of that the images should be sized to _1920px_. The icons used on the site are [Material Design Icons](https://icon-sets.iconify.design/mdi/) from iconify.

## Testing

Tests are built using `vitest`. Any new components should have unit tests for it. A [snapshot test](https://vitest.dev/guide/snapshot.html) is the minimum to include. Any logic branches should have individual unit tests around them.

## Disclaimer

This code has been cleaned up and improved using Large Language Models (LLMs) to ensure better readability, maintainability, and functionality. Please review the code and test it in your environment before using it in production.
