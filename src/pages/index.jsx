import React from "react";
import {graphql} from "gatsby";
import {Box, Button} from "@mui/material";
import HeroArticle from "../components/HeroArticle";
import InternalLink from "../components/InternalLink";
import PropTypes from "prop-types";
import {mdxNodeToArticleDigest} from "../props/converters.mjs";
import FeaturedArticleGrid from "../components/FeaturedArticleGrid";
import {MDXNodeProps} from "../props";
import PageSEO from "../components/PageSEO";

/**
 * React component that renders the index page of the site.
 *
 * @param {PageIndexProps} props - The index page props.
 * @return {React.ReactElement} - The react component.
 */
const PageIndex = ({data: {lead, remaining}}) => {
  const leadArticle = mdxNodeToArticleDigest(lead.edges[0].node);
  const remainingArticles = remaining.edges.map((edge) => {
    return mdxNodeToArticleDigest(edge.node);
  });
  return (
    <main>
      <HeroArticle article={leadArticle} />
      <FeaturedArticleGrid articles={remainingArticles} />
      <Box sx={{mt: 2}}>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          fullWidth
          component={InternalLink}
          to={"/article"}
        >
          View All Articles
        </Button>
      </Box>
    </main>
  );
};

/**
 * @typedef PageIndexProps - The props for the index page.
 * @property {Object} data - The page data.
 * @property {Object} data.lead - A graphql query for the lead.
 * @property {Object[]} data.lead.edges - All the nodes in the lead graphql.
 * @property {MDXNodeProps} data.lead.edges.node - The lead mdx node.
 * @property {Object} data.remaining - A graphql query for remaining nodes on the page.
 * @property {Object[]} data.remaining.edges - All the nodes in the remaining graphql.
 * @property {MDXNodeProps} data.remaining.edges.node - The remaining mdx node.
 */
PageIndex.propTypes = {
  data: PropTypes.shape({
    lead: PropTypes.shape({
      edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: MDXNodeProps.isRequired,
          }).isRequired,
      ).isRequired,
    }).isRequired,
    remaining: PropTypes.shape({
      edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: MDXNodeProps.isRequired,
          }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export const Head = () => {
  return <PageSEO path="/" />;
};


export const pageQuery = graphql`
  query {
    lead: allMdx(
      limit: 1
      sort: [{frontmatter: {published: DESC}}, {frontmatter:{title:ASC}}]
    ) {
      edges {
        node {
          excerpt(pruneLength: 280),
          frontmatter {
            published(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
              childImageSharp {
                gatsbyImageData(
                  width: 1150, 
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  aspectRatio: 2.33
                )
                }
              }
            }
          }
        }
      }
    },
    remaining: allMdx(
      limit: 8
      skip: 1
      sort: [{frontmatter: {published: DESC}}, {frontmatter:{title:ASC}}]
    ) {
      edges {
        node {
          excerpt(pruneLength: 160),
          frontmatter {
            published(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 180, 
                    placeholder: BLURRED
                    layout: CONSTRAINED
                    aspectRatio: 0.75
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


export default PageIndex;
