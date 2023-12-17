import React from "react";
import {graphql} from "gatsby";
import {Box} from "@mui/material";
import DisplayLimit from "../components/DisplayLimit";
import SecondaryArticleGrid from "../components/SecondaryArticleGrid";
import TagBreadcrumb from "../components/TagBreadCrumb";
import {mdxNodeToArticleDigest} from "../props/converters.mjs";
import PropTypes from "prop-types";
import {MDXNodeProps} from "../props";
import PageSEO from "../components/PageSEO";

// Maximum number of articles to display on the page
const maxDisplay = 30;

/**
 * React component that renders a page for a single tag.
 *
 * @param {TagTemplateProps} props - The tag template props.
 * @return {React.ReactElement} - The react component.
 */
const TagTemplate = ({data, pageContext}) => {
  const {tag} = pageContext;
  const {edges, totalCount} = data.allMdx;
  const articles = edges.map((edge) => {
    return mdxNodeToArticleDigest(edge.node);
  });
  return (
    <Box>
      <TagBreadcrumb name={tag} />
      <SecondaryArticleGrid articles={articles} />
      <DisplayLimit limit={maxDisplay} total={totalCount} />
    </Box>
  );
};

/**
 * @typedef TagTemplateProps - The tag template props.
 * @property {Object} data - The page data.
 * @property {Object} data.allMdx - The mdx node.
 * @property {Object[]} data.allMdx.edges - All the edges in the graphql.
 * @property {MDXNodeProps} data.allMdx.edges.node - The mdx nodes.
 * @property {number} data.allMdx.totalCount - The count of nodes in the graphql.
 * @property {Object} pageContext - The additional context passed to the page.
 * @property {string} pageContext.tag - The tag the page is rendering.
 */
TagTemplate.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: MDXNodeProps.isRequired,
          }).isRequired,
      ).isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
};

// eslint-disable-next-line react/prop-types
export const Head = ({pageContext: {tag}}) => {
  const title = `${tag} | Tags`;
  return <PageSEO title={title} />;
};

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 30
      filter: {frontmatter: {tags: {eq: $tag}}}
      sort: [{frontmatter: {published: DESC}}, {frontmatter: {title: ASC}}]
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          frontmatter {
            published(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 524
                    placeholder: BLURRED
                    layout: CONSTRAINED
                    aspectRatio: 1.78
                  )
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

export default TagTemplate;


