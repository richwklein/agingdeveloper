import React from "react";
import {graphql} from "gatsby";
import {Box, Button, Grid} from "@mui/material";
import HeroBlock from "../components/index/HeroBlock";
import FeaturedPost from "../components/index/FeaturedArticle";
import {useSiteData} from "../hooks/useSiteData";
import InternalLink from "../components/common/InternalLink";

// TODO proptypes and head-seo
const PageIndex = ({data: {lead, remaining}}) => {
  const {frontmatter: {title, slug, featured}, excerpt} = lead.edges[0].node;
  const featuredImage = featured.image.childImageSharp.gatsbyImageData;

  return (
    <main>
      <HeroBlock hero={{title: title, slug: slug, excerpt: excerpt, image: featuredImage}} />
      <Grid container spacing={4} sx={{marginTop: 2}}>
        {remaining.edges.map((edge) => (
          <FeaturedPost key={edge.node.frontmatter.slug} article={{date: edge.node.frontmatter.date, excerpt: edge.node.excerpt, image: edge.node.frontmatter.featured.image.childImageSharp.gatsbyImageData, title: edge.node.frontmatter.title, slug: edge.node.frontmatter.slug}} />
        ))}
      </Grid>
      <Box sx={{marginTop: 2}}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth={true}
          component={InternalLink}
          to={"/article"}
        >
          View All
        </Button>
      </Box>
    </main>
  );
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
      limit: 6
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
