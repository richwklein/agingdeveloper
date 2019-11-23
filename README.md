# Aging Developer

[![Netlify Status](https://api.netlify.com/api/v1/badges/9fff03eb-d9c8-48d1-887d-11aea21246cd/deploy-status)](https://app.netlify.com/sites/agingdeveloper/deploys)

This is the personal site of Richard Klein. It is a static site built using [gatsby](https://www.gatsbyjs.org/) and deployed via [netlify](https://www.netlify.com/). You can find a live version of it at [agingdeveloper.com](https://agingdeveloper.com/). The site is built from just the basic [hello world starter](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-hello-world/) and being expanded upon from there. [Mockups](./mocks) are available for the planned page layouts.

### TODO
* set up code owners
* Add a make file
* Merge in the pre-commit hook
* Fix eslint and jshint errors
* Explain where the blog content lives vs the code
* Github templates
* Pages
    ** About
    ** Category / Tag
    ** Home
    ** Post
* Components
    ** Header
    ** Sidebar
    ** Logo
    ** Layout
    ** Helmet
* Make mobile reactive
* Set up licensing and attribution
* Add canonical urls
* Figure out typography
* Analytics
* robots.txt
* favicon.ico
* social metadata


## Start local development
Most javascript developers will likely already have the tools installed, but here is a quick rundown of setting things up just in case you do not. I'm using brew here since I develop on a Mac. Windows developers will have to use other package
managers.

1. **Install node and npm**

```cli
brew install node
```

2. **Install the gatsby command line interface globally**

```cli
npm install -g gatsby-cli
```

3. **Install dependencies**

```cli
cd agingdeveloper/
npm install
npm install -g prettier
```

4. **Start development server**

```cli
gatsby develop
```

5. **Open the source code and start editing**

Gatsby will start a hot-reloading development environment accessible by default at `http://localhost:8000`.

> You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data.

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