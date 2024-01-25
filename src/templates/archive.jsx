import React from "react";
import {Pagination, Stack} from "@mui/material";
import {graphql, navigate} from "gatsby";
import PropTypes from "prop-types";
import BreadcrumbBlock from "../components/BreadcrumbBlock";
import PageSEO from "../components/PageSEO";
import SecondaryArticleGrid from "../components/SecondaryArticleGrid";
import {MDXNodeProps} from "../props";
import {mdxNodeToArticleDigest} from "../props/converters.mjs";

/**
 * React component that renders an archive page of articles.
 *
 * @param {ArchiveTemplateProps} props - The archive template page props.
 * @return {React.ReactElement} - The react component.
 */
const ArchiveTemplate = ({data, pageContext}) => {
  const {pageCount, pageNumber} = pageContext;
  const tail = pageNumber == 1 ? null : pageNumber;

  const {edges} = data.allMdx;
  const articles = edges.map((edge) => {
    return mdxNodeToArticleDigest(edge.node);
  });

  const handleChange = (event, value) => {
    if (value == 1) {
      navigate("/article");
    } else {
      navigate(`/article/archive-${value}`);
    }
  };

  return (
    <>
      <BreadcrumbBlock head={{name: "Articles", path: "/article"}} tail={tail} />
      <SecondaryArticleGrid articles={articles} />
      <Stack sx={{mt: 2}} direction="column" alignItems="center">
        <Pagination count={pageCount} page={pageNumber} size="large" onChange={handleChange} />
      </Stack>
    </>
  );
};

/**
 * @typedef ArchiveTemplateProps - The archive template props.
 * @property {Object} data - The page data.
 * @property {Object} data.allMdx - The mdx node.
 * @property {Object[]} data.allMdx.edges - All the edges in the graphql.
 * @property {MDXNodeProps} data.allMdx.edges.node - The mdx nodes.
 * @property {Object} pageContext - The additional context passed to the page.
 * @property {string} pageContext.limit - The graphql query limit.
 * @property {string} pageContext.limit - The graphql query skip.
 * @property {string} pageContext.pageCount - The total number of pages.
 * @property {string} pageContext.pageNumber - The number of the current page.
 */
ArchiveTemplate.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: MDXNodeProps.isRequired,
          }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
  }),
};

export default ArchiveTemplate;

// eslint-disable-next-line react/prop-types
export const Head = ({pageContext: {pageNumber}}) => {
  const title = pageNumber == 1 ? "Articles" : `Articles ${pageNumber}`;
  const path = pageNumber == 1 ? "/article" : `/article/archive-${pageNumber}`;

  return <PageSEO title={title} path={path} />;
};

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(
      sort: [{frontmatter: {published: DESC}}, {frontmatter: {title: ASC}}]
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          frontmatter {
            published
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
    }
  }
`;
