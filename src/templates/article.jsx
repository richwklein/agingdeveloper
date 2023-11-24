import * as React from "react";
import {graphql} from "gatsby";
import {MDXProvider} from "@mdx-js/react";
import MDXLink from "../components/MDXLink";

const components = {
  a: MDXLink,
};

const ArticleTemplate = ({data: {mdx}, children}) => {
  const {frontmatter: {title, date}} = mdx;
  return (
    <article>
      <h1>{title}</h1>
      <h2>{date}</h2>
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
    </article>
  );
};

export const pageQuery = graphql`
  query($currentPath: String) {
    mdx(frontmatter: { slug: { eq: $currentPath } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;

export default ArticleTemplate;
