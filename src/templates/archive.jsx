import React from "react";
import {navigate, graphql} from "gatsby";
import {mdxNodeToArticleDigest} from "../props/converters.mjs";
import PropTypes from "prop-types";
import {MDXNodeProps} from "../props";
import PageSEO from "../components/PageSEO";
import {Breadcrumbs, Divider, Pagination, Stack, Typography} from "@mui/material";
import SecondaryArticleGrid from "../components/SecondaryArticleGrid";
import InternalLink from "../components/InternalLink";

/**
 * React component for rendering a breadcrumb for archive pages.
 * If page is 1 then just the name of the index page is shown.
 * Otherwise, a link to the index page and the name of the pageNumber are shown.
 *
 * @param {ArchiveBreadcrumbProps} props - The archive breadcrumb props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ArchiveBreadcrumb page={1} />
 *
 * @ignore
 */
const ArchiveBreadcrumb = ({page}) => {
  return (
    <Divider sx={{
      "mb": 4,
      ".MuiBreadcrumbs-ol": {
        flexFlow: "row",
      },
    }}>
      <Breadcrumbs>
        {page == 1 ? (
        <Typography color="text.primary">{"Archives"}</Typography>
      ) : (
          <InternalLink
            underline="hover"
            color="inherit"
            to={"/article"}>
            {"Archives"}
          </InternalLink>
      )}
        <Typography color="text.primary">{page}</Typography>
      </Breadcrumbs>
    </Divider>
  );
};

/**
 * @typedef ArchiveBreadcrumbProps - The archive breadcrumb props.
 * @property {number} page - The current page of the archive.
 *
 * @ignore
 */
ArchiveBreadcrumb.propTypes = {
  page: PropTypes.number.isRequired,
};

/**
 * React component that renders an archive page of articles.
 *
 * @param {ArchiveTemplateProps} props - The archive template page props.
 * @return {React.ReactElement} - The react component.
 */
const ArchiveTemplate = ({data, pageContext}) => {
  const {pageCount, pageNumber} = pageContext;
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
    <Stack direction="column" alignItems="center" spacing={0} useFlexGap>
      <ArchiveBreadcrumb page={pageNumber} />
      <SecondaryArticleGrid articles={articles} />
      <Pagination count={pageCount} page={pageNumber} size="large" onChange={handleChange} />
    </Stack>
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

// eslint-disable-next-line react/prop-types
export const Head = ({pageContext: {pageNumber}}) => {
  const title = pageNumber == 1 ? "Archive" : `Archive ${pageNumber}`;
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
    }
  }
`;

export default ArchiveTemplate;
