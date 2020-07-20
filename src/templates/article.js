import React, { Fragment } from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { Box, Divider, Typography, Grid } from "@material-ui/core";
import Layout from "../components/Layout";
import { useHasScroll } from "has-scroll-hook";
import { MDXRenderer } from "gatsby-plugin-mdx";

const ArticleTitle = ({ title }) => {
  return (
    <Fragment>
      <Typography
        variant="h4"
        style={{
          fontFamily:
            "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
        }}
      >
        {title}
      </Typography>
      <Divider />
    </Fragment>
  );
};

export default ({ data, context }) => {
  const hasScroll = useHasScroll();

  const {
    frontmatter: { image, title },
    body,
  } = data.mdx;

  return (
    <Layout hasScroll={hasScroll} showLogoImage={true}>
      <Box padding={2} flexGrow={1} marginX="auto" width="100%" maxWidth={1280}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ArticleTitle title={title} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Img
              fluid={image.childImageSharp.fluid}
              style={{ borderRadius: 2 }}
            />
            <article>
              <MDXRenderer>{body}</MDXRenderer>
            </article>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($permalink: String!) {
    mdx(frontmatter: { slug: { eq: $permalink } }) {
      body
      frontmatter {
        slug
        title
        date
        tags
        category
        image {
          childImageSharp {
            fluid(maxWidth: 1280, maxHeight: 800, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
