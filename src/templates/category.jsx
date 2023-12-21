import React, {Fragment} from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";
import DisplayLimit from "../components/DisplayLimit";
import PageSEO from "../components/PageSEO";
import SecondaryArticleGrid from "../components/SecondaryArticleGrid";
import TagBreadcrumb from "../components/TagBreadCrumb";
import {MDXNodeProps} from "../props";
import {mdxNodeToArticleDigest} from "../props/converters.mjs";

/**
 * React component that renders a page for a single category
 *
 * @param {CategoryTemplateProps} props - The category template props.
 * @return {React.ReactElement} - The react component.
 */
const CategoryTemplate = ({data, pageContext}) => {
  const {category, limit} = pageContext;
  const {edges, totalCount} = data.allMdx;
  const articles = edges.map((edge) => {
    return mdxNodeToArticleDigest(edge.node);
  });

  return (
    <Fragment>
      <TagBreadcrumb name={category} isCategory={true} />
      <SecondaryArticleGrid articles={articles} />
      <DisplayLimit limit={limit} total={totalCount} />
    </Fragment>
  );
};

/**
 * @typedef CategoryTemplateProps - The category template props.
 * @property {Object} data - The page data.
 * @property {Object} data.allMdx - The mdx node.
 * @property {Object[]} data.allMdx.edges - All the edges in the graphql.
 * @property {MDXNodeProps} data.allMdx.edges.node - The mdx nodes.
 * @property {number} data.allMdx.totalCount - The count of nodes in the graphql.
 * @property {Object} pageContext - The additional context passed to the page.
 * @property {number} pageContext.limit - The limit of articles to show on the page.
 * @property {string} pageContext.pathSuffix - The suffix (slug) of the url for these pages.
 * @property {string} pageContext.category - The category the page is rendering.
 */
CategoryTemplate.propTypes = {
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
    limit: PropTypes.number.isRequired,
    pathSuffix: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

export default CategoryTemplate;

// eslint-disable-next-line react/prop-types
export const Head = ({pageContext: {pathSuffix, category}}) => {
  const title = `${category} | Categories`;
  return <PageSEO title={title} path={`/category/${pathSuffix}`} />;
};

export const pageQuery = graphql`
  query($category: String!, $limit: Int!) {
    allMdx(
      limit: $limit
      filter: {frontmatter: {category: {eq: $category}}}
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
