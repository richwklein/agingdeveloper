---
slug: 2024-01-13-mdx-codeblock
title: Switching Code Blocks to prism-react-renderer
description: "The process to switch the site from gatsby-remark-prismjs to prism-react-renderer"
author: richwklein
featured:
  image: ferenc-almasi-L8KQIPCODV8-unsplash.jpg
  author:
    name: Ferenc Almasi
    url: https://unsplash.com/@flowforfrank?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  site:
    name: Unsplash
    url: https://unsplash.com/photos/black-flat-screen-tv-turned-on-displaying-unk-L8KQIPCODV8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
tags:
  - gatsbyjs
  - rebuild
  - react
  - code
  - codeblock
  - test
category: code
published: "2024-01-13"
---

When I was [rebuilding](/article/2023-12-31-gatsby-rebuild) this site, I spent a fair amount of time in the documentation for each plugin that is being used. While reading through the [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=mdx#gatsby-plugin-mdx) page, I ran across a *gatsby-remark* section. That section suggests switching to use the **prism-react-renderer** for code blocks.

> In some cases, like gatsby-remark-prismjs, it makes more sense to use a library like prism-react-renderer to render codeblocks using a React component.

The Aging Developer was previously using the **gatsby-remark-prismjs** plugin so I created a Github issue to replace it. I tackled that [issue](https://github.com/richwklein/agingdeveloper/issues/572) this week. There is a wonderful [article](https://prince.dev/prism-react-renderer) that I used as a guide while I did it. That article got me most of the way there, but there were a couple of gotchas that had to be figured while I was doing it. I'm sure others will run into the same issues, so I thought it worthwhile for me to write about it. 

To write a custom component that uses the **prism-react-renderer** package, I first installed the **prism-react-renderer** package.

```shell
npm install prism-react-render
```

## Associating the Component with an MDX Shortcode

The `MDXProvider` that is used in this site's [article template](https://github.com/richwklein/agingdeveloper/blob/main/src/templates/article.jsx) needs to know that a custom component should be used when rendering code blocks. This is done by associating the component with an mdx [shortcode](https://mdxjs.com/table-of-components).

```jsx
import MDXCode from "../components/MDXCode";
import MDXLink from "../components/MDXLink";

const components = {
  pre: MDXCode,
  a: MDXLink,
};

<Grid item md={9} sm={12} xs={12}>
  <MDXProvider components={components}>
    {children}
  </MDXProvider>
</Grid>
```

Here is where this site's setup is a little different from the original article I was using. That article replaces the `<pre>` tag with a `<div>` then uses the custom component for `<code>` tags. What I found is that setup caused the new component to be used for inline code blocks as well. I possibly could have made that work by looking at the type of the children prop being passed in and handling a string differently than a react component. Instead I followed this [hashicorp bug comment](https://github.com/hashicorp/next-mdx-remote/issues/244#issuecomment-1061832370) and matched the component with the `<pre>` tag instead.

To handle inline code blocks I added some basic css to style it.

```css
code {
  border-radius: .3em;
  padding: .15em .25em;
  /* colors taken from the vsDark them */
  color: rgb(156, 220, 254); 
  background-color: rgb(30, 30, 30);
}
```

## Writing the Code Block Component

The `MDXProvider` will use the `MDXCode` component when rendering any `<pre>` tags. So we have to define that component.

```jsx
export const MDXCode = ({children}) => {
  if (children.type != "code") {
    return (
      <pre>{children}</pre>
    );
  }

  const {props: {className, children: code}} = children;
  const language = className?.replace(/language-/, "").trim() || "";

  return (
    <Highlight
      theme={themes.vsDark}
      code={code.trim()}
      language={language}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style}}>
          {tokens.map((line, index) => {
            const lineProps = getLineProps({line, key: index});
            return (
              <div key={index} {...lineProps}>
                {line.map((token, key) => (
                  <span key={key}{...getTokenProps({token, key})} />
                ))}
              </div>
            );
          },
          )}

        </pre>
      )}
    </Highlight>
  );
};

export default MDXCode;
```

The html `<pre>` tag defines preformatted text. The MDX outputs that around our code block. There is still a slim chance that tag may be used for something other than code. The first thing our new component does is check that the child react element is of a "type" **code**. If not the component just wraps the children in a `<pre>` so that it would have behaved similar to if the site wasn't using a custom component at all.

```jsx
if (children.type != "code") {
  return (
    <pre>{children}</pre>
  );
}
```

Next the component gets the className and the children of the children (which is the actual code). The component then pulls the language from the className. These are then used by the `<Highlight>` component that **prism-react-renderer** provides. 

```jsx
const {props: {className, children: code}} = children;
const language = className?.replace(/language-/, "").trim() || "";
```

The rest of the component is pretty much the same as all the examples for using the `<Highlight>` component including those on the article I was following along with. I am using the *vsDark* theme and added a little css to add some padding and a border radius.

```css
pre[class*="language-"] {
  border-radius: .3em;
  padding: .2em .6em;
}
```

The other thing that the component does is trim the code string so as to remove any trailing new lines or spaces. A trailing new line was another issue that I was running into. 

I added a snapshot test to make sure the component was rendering like I wanted and a test that made this component wraps a non-code children in a `<pre>` and return it. With those tests the component was complete and was being used for the MDX.  

## Removing gatsby-plugin-prismjs

The prismjs package had been installed directly so that one of the built-in themes could be used. I remove the reference to that theme from the *PageLayout* component. Uninstalled the old plugin and remove the reference to it from the *gatsby-config.mjs*

```js
-          {
-            resolve: "gatsby-remark-prismjs",
-            options: {
-              classPrefix: "language-",
-              showLineNumbers: false,
-              noInlineHighlight: false,
-            },
-          },
```

## Done

That is it. The **gatsby-remark-prismjs** package has been removed and the site is now using the **prism-react-renderer** component instead. The code inside that component is pretty verbose, but it does give my a lot of flexible to how I want to render it. In the future I can add things like line numbers and code highlighting pretty easily if I want.
