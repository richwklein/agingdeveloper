---
slug: 2023-12-01-gatsby-rebuild
title: Rebuilding with Gatsby
description: "The journey to bring this site back to life through a rebuild on the latest major releases."
author: richwklein
featured: 
  image: cande-cop-PhP4GQywOLE-unsplash.jpg
  author:
    name: Cande cop
    url: https://unsplash.com/@candegrafias?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  site:
    name: Unsplash
    url: https://unsplash.com/photos/brown-and-black-car-steering-wheel-PhP4GQywOLE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
tags:
  - gatsbyjs
  - material-ui
  - jest
  - test
  - author
  - support
  - rebuild
category: code
published: "2023-12-01"
---

I've previously wrote that [major versions should be considered harmful](/article/2022-02-26-major-harmful). I haven't done anything with this site in a long time partially because of that. Another reason is I wanted something where I could run a small amount of code on the front-end, but I wanted the majority of the site to be statically generated. When I say statically generated, I do not mean pre-generating large amounts of javascript that then hydrates and renders the page client side. I wanted to generate actual html that is returned by the server and only have small amount of js for interactions. That has lead me to look at various other static site generators like **[astro](https://astro.build/)** and **[11ty](https://www.11ty.dev/)**. I wasn't able to find a generator that really spoke to me. **[Gatsby](https://www.gatsbyjs.com/)** now has a feature called "Partial Hydration" (more details here) it seems like it may fulfill what I'm looking for so I'm back rebuilding with Gatsby.

I'm using this article to chronicle my experiences in going from the existing `Gatsby 2.*` based site to a `Gatsby 5.*` site. I'm going to use the original code for guidance, but it has been a few years so I'll mainly be rebuilding from scratch.

## Timeline
I've started this endeavor on October 7th, 2023. My goal is to work on this on the weekends when I have time available throughout the next few months. I would like to relaunch the updated site by the end of the year.

## Partial Hydration
After doing some more reading the *partial hydration* feature that are some caveats that I'll have to evaluate. Partial Hydration requires using an experimental version of *react* and *react-dom*. It may not work well with some other new features that improve performance like [Slices](https://www.gatsbyjs.com/docs/reference/release-notes/v5.0/#slice-api). I'm going to continue the rebuild and determine if any of those caveats are a show stopper and which features I want more.

## Testing

The first time creating this site, I didn't bother creating unit tests. It was a personal project being built in my spare time. It didn't feel worthwhile to create them. This time around, I've started adding unit tests of at least the components I figure these will give me a little assurance that dependency version bumps have some automated testing on them. 

Part of the hesitancy with creating tests before was around all the scaffolding needed to stand up basic unit tests. That is still a complaint. I needed to install 7 dev packages, 4 configuration files, and two mock files just to get some very basic testing going. Along with the [Gatsby documentation](https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/) The following articles were a huge help in setting these up.

- [Get started with Gatsby and Unit Testing](https://danielabaron.me/blog/gatsby-unit-testing/)
- [How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/)


## Stumbling Blocks
This section is going to be where I run into difficulties that make this development process harder.

- node segfault when not using debug argument
- having to use legacy-peer-deps argument in npm install

- analytics
- authors
- categories
- comments
- material ui

proptypes head api and local development does not work together

### Material UI Upgrade
Doing this upgrade I went from v4.* of [Material UI](https://mui.com/material-ui/getting-started/) to v5.*.
The import paths all changed. They went from "@material-ui" to "@mui/material/". Another big changes to deal with with going 
from JSS to [Emotion](https://emotion.sh/docs/introduction) for 
the default styling. This meant a whole new syntax when wanting to override the theme.

### Common JS vs ES Modules
I started out with the react components for this build using the ES modules syntax for imports and exports. I also started to switch over Gatsby files to that format as well. The eslint configuration is setup using the module syntax. I started to run into some problems with an import statement in some of my unit tests. This lead me down a rabbit hole where I learned Jest only has experimental support for ES Modules and Gatsby also only has partial support. If I specify "module" as the type in my `package.json` then the gatsby `develop` command starts failing trying to load a file from cache without an extension on it. 

I'm going to stick with using the ES Module syntax. I've got the type set in package.json to commonjs, so that will be the default syntax. I'm using the module syntax in `.mjs` files for Gatsby and in the `.jsx` files for React.

## Take Away
One philosophy I've picked up and used from work is that we should avoid stateful components including graphql queries. The page should be responsible for running the queries and passing the data to each component that the component needs to render.

Talk about prop types https://www.npmjs.com/package/prop-types#prop-types- and generated documentation
