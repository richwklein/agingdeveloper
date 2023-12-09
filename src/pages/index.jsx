import React from "react";
import {graphql} from "gatsby";
import {Box, Button, Grid} from "@mui/material";
import HeroBlock from "../components/index/HeroBlock";
import FeaturedPost from "../components/index/FeaturedArticle";
import {useSiteData} from "../hooks/useSiteData";
import InternalLink from "../components/InternalLink";
import PropTypes from "prop-types";

// TODO proptypes and head-seo
const PageIndex = ({data: {lead, remaining}}) => {
  const {frontmatter: {title, slug, featured}, excerpt} = lead.edges[0].node;
  const featuredImage = featured.image.childImageSharp.gatsbyImageData;

  return (
    <main>
      <HeroBlock hero={{title: title, slug: slug, excerpt: excerpt, image: featuredImage}} />
      <Grid container rowSpacing={4} columnSpacing={3} sx={{mt: 0}}>
        {remaining.edges.map((edge) => (
          <FeaturedPost key={edge.node.frontmatter.slug} article={{
            date: edge.node.frontmatter.date,
            excerpt: edge.node.excerpt,
            image: edge.node.frontmatter.featured.image.childImageSharp.gatsbyImageData,
            title: edge.node.frontmatter.title,
            slug: edge.node.frontmatter.slug}} />
        ))}
      </Grid>
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
            node: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                featured: PropTypes.shape({
                  author: PropTypes.object.isRequired,
                  site: PropTypes.object.isRequired,
                  image: PropTypes.any,
                }).isRequired,
              }).isRequired,
              excerpt: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
      ).isRequired,
    }).isRequired,
    remaining: PropTypes.shape({
      edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                featured: PropTypes.shape({
                  image: PropTypes.any,
                }).isRequired,
              }).isRequired,
              excerpt: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export const Head = () => {
  const {title} = useSiteData();
  return <title>{title}</title>;
};


export const pageQuery = graphql`
  query {
    lead: allMdx(
      limit: 1
      sort: [{frontmatter: {date: DESC}}, {frontmatter:{title:ASC}}]
    ) {
      edges {
        node {
          excerpt(pruneLength: 280),
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
              childImageSharp {
                gatsbyImageData(
                width: 1150, 
                height: 493,
                placeholder: BLURRED
                layout: CONSTRAINED
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
      sort: [{frontmatter: {date: DESC}}, {frontmatter:{title:ASC}}]
    ) {
      edges {
        node {
          excerpt(pruneLength: 160),
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featured {
              image {
              childImageSharp {
                gatsbyImageData(
                width: 180,
                height: 240, 
                placeholder: BLURRED
                layout: CONSTRAINED
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
