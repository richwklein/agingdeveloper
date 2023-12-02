import React from "react";
import {graphql} from "gatsby";
import {MDXProvider} from "@mdx-js/react";
import MDXLink from "../components/MDXLink";
import ArticleByLine from "../components/ArticleByLine";
import PropTypes from "prop-types";
import ArticleTitleBlock from "../components/ArticleTitleBlock";

const components = {
  a: MDXLink,
};

const ArticleTemplate = ({data: {mdx}, children}) => {
  const {frontmatter: {title, description, author, date}} = mdx;
  return (
    <article>
      <ArticleByLine authorName={author.name} authorSlug={author.slug} publishedDate={date} />
      <ArticleTitleBlock title={title} description={description } />
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
    </article>
  );
};

export default ArticleTemplate;

export const Head = ({data: {mdx}}) => {
  const {frontmatter: {title}} = mdx;
  return (<title>{title}</title>);
};

export const pageQuery = graphql`
  query($currentPath: String) {
    mdx(frontmatter: { slug: { eq: $currentPath } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        author {
          name
          slug
        }
      }
    }
  }
`;

