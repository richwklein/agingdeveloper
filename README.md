
# Aging Developer

[![Netlify Status](https://api.netlify.com/api/v1/badges/9fff03eb-d9c8-48d1-887d-11aea21246cd/deploy-status)](https://app.netlify.com/sites/agingdeveloper/deploys)

This is the personal site of Richard Klein. It is a static site built using [gatsby](https://www.gatsbyjs.org/) and 
[material-ui](https://material-ui.com). It is deployed via [netlify](https://www.netlify.com/). You can find a live 
version of it at [agingdeveloper.com](https://agingdeveloper.com/). The site is built based on the 
[Sky Lite theme](https://github.com/vim-labs/gatsby-theme-sky-lite) and expanded upon from there. See the 
[github issues](https://github.com/richwklein/agingdeveloper/issues) to track development progress.

## What's in This Document
  - [License](#license)
  - [Start local development](#start-local-development)
    - [Create a production build.](#create-a-production-build)
    - [Serve the production build locally.](#serve-the-production-build-locally)
  - [VSCode settings](#vscode-settings)
  
## License
- The site code is [MIT](/LICENSE) licensed 
- The libraries the site is based upon are MIT licensed where feasible.
- Content hosted on the site is 
- [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) 
  licensed unless otherwise noted.

## Start local development
Most javascript developers will likely already have the tools installed, but here is a quick rundown of setting things 
up just in case you do not. I'm using brew here since I develop on a Mac. Windows developers will have to use other 
package managers.

1. **Install node and npm**

```cli
brew install node
```

2. **Install dependencies**

```cli
cd agingdeveloper/
make install
```

This will install local npm dependencies.

1. **Start the development server**

```cli
make develop
```

5. **Open the source code and start editing**

Gatsby will start a hot-reloading development environment accessible by default at `http://localhost:8000`.

> You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data.

Try editing the JavaScript pages in src/pages. Saved changes will live reload in the browser.

## Create a build.

```cli
make build
```

Gatsby will perform an optimized production build for your site, generating static HTML and per-route JavaScript code bundles.

## Serve the build locally.

```cli
make serve
```

Gatsby starts a local HTML server for testing your built site. Remember to build your site using gatsby build before using this command.

## Create a CI build

```cli
make build-ci
```

This will make sure source code is formatted, run tests, then create a build.

## VSCode Settings

VSCode is the main editor that is used on this site. ESLint is used for linting and formatting. 
These settings enable a good workflow where lint issues are automatically corrected on save.

```json
{
    "editor.tabCompletion": "on",
    "editor.rulers": [80, 100, 120],
    "editor.tabSize": 2,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.format.enable": true,
    "eslint.lintTask.enable": true,
}
```