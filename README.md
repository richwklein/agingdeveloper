# Aging Developer
This is the personal site of Richard Klein. It is a static site built using [gatsby](https://www.gatsbyjs.org/) and deployed via [netlify](https://www.netlify.com/). You can find a live version of it at [agingdeveloper.com](https://agingdeveloper.com/)

This site started from just the basic [hello world starter](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-hello-world/) and is being developed from there. [Wireframe mockups](./mocks) are available for the planned page layouts.

### TODO
* Explain where the blog content lives vs the code
* Make sidebar mobile reactive
* Set up licensing and attribution
* Add canonical urls
* Figure out typography

## Start local development
Most javascript developers will likely already have the tools installed, but here is a quick rundown of setting things up just in case you do not. I'm using brew here since I develop on a Mac. Windows developers will have to use other package
managers.

**Install node and npm**

```cli
brew install node
```

**Install the gatsby command line interface globally**

```cli
npm install -g gatsby-cli
```

**Install dependencies**

```cli
npm install
```

**Start development server**

```cli
cd agingdeveloper/
gatsby develop
```
**Open the source code and start editing!**
Gatsby will start a hot-reloading development environment accessible by default at `http://localhost:8000`.

_Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data.

Try editing the JavaScript pages in src/pages. Saved changes will live reload in the browser.

## Create a production build.

```cli
gatsby build
```

Gatsby will perform an optimized production build for your site, generating static HTML and per-route JavaScript code bundles.

## Serve the production build locally.

```cli
gatsby serve
```

Gatsby starts a local HTML server for testing your built site. Remember to build your site using gatsby build before using this command.