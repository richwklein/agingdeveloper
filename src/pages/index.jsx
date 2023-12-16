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

// TODO proptypes and head-seo
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
  return <PageSEO />;
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
