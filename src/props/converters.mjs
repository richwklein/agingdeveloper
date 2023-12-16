/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import {ArticleDigestProps, MDXNodeProps} from ".";

/**
 * Convert a `graphql` mdx node into an object with the ArticleDigestProps.
 *
 * @param {MDXNodeProps} node - The mdx node to convert.
 * @return {ArticleDigestProps} - The article digest.
 */
export const mdxNodeToArticleDigest = (node) => {
  const article = {
    slug: node.frontmatter.slug,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    image: node.frontmatter.featured.image.childImageSharp.gatsbyImageData,
    excerpt: node.excerpt,
  };
  PropTypes.checkPropTypes(ArticleDigestProps, article);
  return article;
};
