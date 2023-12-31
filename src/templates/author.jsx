import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";
import DisplayLimit from "../components/DisplayLimit";
import {InternalBackButton} from "../components/InternalBackButton";
import PageSEO from "../components/PageSEO";
import SecondaryArticleGrid from "../components/SecondaryArticleGrid";
import SocialButtonBar from "../components/SocialButtonBar";
import TitleBlock from "../components/TitleBlock";
import {AuthorNodeProps, MDXNodeProps} from "../props";
import {mdxNodeToArticleDigest} from "../props/converters.mjs";


/**
 * Renders the page of an individual author.
 *
 * @param {AuthorTemplateProps} props
 * @return {React.ReactElement} - The react component
 */
const AuthorTemplate = ({data, pageContext}) => {
  const {limit} = pageContext;
  const {edges, totalCount} = data.allMdx;
  const {name, image, bio, socials} = data.authorYaml;
  const articles = edges.map((edge) => {
    return mdxNodeToArticleDigest(edge.node);
  });
  return (
    <>
      <TitleBlock title={name} subtitle={bio} image={image.childImageSharp.gatsbyImageData}>
        <SocialButtonBar socials={socials} />
      </TitleBlock>
      <SecondaryArticleGrid articles={articles} />
      <DisplayLimit limit={limit} total={totalCount} />
      <InternalBackButton name={"authors"} path={"/author"} />
    </>
  );
};

/**
 * @typedef AuthorTemplateProps - The author template props.
 * @property {Object} data - The page data.
 * @property {Object} data.allMdx - The mdx node.
 * @property {Object[]} data.allMdx.edges - All the edges in the graphql.
 * @property {MDXNodeProps} data.allMdx.edges.node - The mdx nodes.
 * @property {number} data.allMdx.totalCount - The count of nodes in the graphql.
 * @property {AuthorNodeProps} data.authorYaml - The author node.
 * @property {Object} pageContext - The additional context passed to the page.
 * @property {number} pageContext.limit - The limit of articles to show on the page.
 * @property {string} pageContext.pathSuffix - The suffix (slug) of the url for these pages.
 */
AuthorTemplate.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: MDXNodeProps.isRequired,
          }).isRequired,
      ).isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
    authorYaml: AuthorNodeProps.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    pathSuffix: PropTypes.string.isRequired,
  }),
};

export default AuthorTemplate;

// eslint-disable-next-line react/prop-types
export const Head = ({data, pageContext: {pathSuffix}}) => {
  // eslint-disable-next-line react/prop-types
  const {name} = data.authorYaml;
  const title = `${name} | Authors`;
  return <PageSEO title={title} path={`/authors/${pathSuffix}`} />;
};


export const pageQuery = graphql`
  query($pathSuffix: String!, $limit: Int!) {
    allMdx(
      limit: $limit
      filter: {frontmatter: {author: {slug: {eq: $pathSuffix}}}}
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
    authorYaml(slug: {eq: $pathSuffix}) {
      name
      bio
      image {
        childImageSharp {
              gatsbyImageData(
                width: 150,
                placeholder: BLURRED
                layout: CONSTRAINED
                aspectRatio: 0.75
              )
        }
      }
      socials {
        name
        url
      }
    }
  }
`;

