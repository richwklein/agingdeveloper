
I've previously wrote that major versions should be considered harmful **link**
I haven't done anything with this site in a long time partially because of that.
Another reason is I wanted something where I could run a small amount of code on
the front-end, but wanted the majority of the site to be statically generated. When
I say statically generated, I do not mean pre-generating large amounts of javascript
that then hydrates and renders the page client side. I wanted to generate actual html 
that is returned by the server and only have small amount of js for interactions. 
That has lead me to look at various other static site generators like **astro** and **11ty**. 
I wasn't able to find anything that really spoke to me though. 
Gatsby now has a feature called "Partial Hydration" (more details here)
it seems like it will fit the bill so I'm back rebuilding with Gatsby again.

This post will be used to chronicle my experiences in going from the existing Gatsby 2.*
based website to a Gatsby 5.* website. I'm going to use the original code for guidance, 
but it has been a few years so I'll mainly be rebuilding from scratch.

## Timeline
I've started this endeavor on October 7th, 2023. My goal is to work on this on the weekends
when I have time available throughout the month. I would like to relaunch the updated site
at the beginning of November.

## Partial Hydration
After doing some more reading the *partial hydration* feature that are some caveats that I'll
have to evaluate. Partial Hydration requires using an experimental version of *react* and *react-dom*. 
It may not work well with some other new features that improve performance like [Slices](https://www.gatsbyjs.com/docs/reference/release-notes/v5.0/#slice-api). 
I'm going to continue the rebuild and determine if any of those caveats are a show stopper and which 
features I want more.

## Stumbling Blocks
This section is going to be where I run into difficulties that make this development process harder.

- node segfault when not using debug argument
- having to use legacy-peer-deps argument in npm install

- analytics
- authors
- categories
- comments
- material ui

Doing this upgrade I went from v4.* of [Material UI](https://mui.com/material-ui/getting-started/) to v5.*.
The import paths all changed. They went from "@material-ui" to "@mui/material/". Another big changes to deal with with going 
from JSS to [Emotion](https://emotion.sh/docs/introduction) for 
the default styling. This meant a whole new syntax when wanting to override the theme.

- testing