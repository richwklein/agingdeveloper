import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Img from "gatsby-image";
import ArticleCard from "../components/ArticleCard";

const useStyles = makeStyles((theme) => ({
  banner: {
    color: theme.palette.grey.A400,
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(2),
  },
  bannerTitle: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 128,
    height: 128,
  },
}));

const Banner = ({ image, title, description }) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner}>
      <Box marginX="auto" width="100%" maxWidth={1280}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Avatar
              component={Img}
              fluid={image}
              loading="eager"
              className={classes.avatar}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h3" className={classes.bannerTitle}>
              {title}
            </Typography>
            <Typography variant="h5">{description}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Articles = ({ articles }) => {
  const articlePathPrefix = "/archive";

  return (
    <Grid container spacing={3}>
      {articles.map(
        ({
          node: {
            excerpt,
            frontmatter: { image, title, date, url },
          },
        }) => {
          return (
            <Grid item xs={12} sm={6} key={url}>
              <ArticleCard
                image={image}
                title={title}
                date={date}
                excerpt={excerpt}
                url={`${articlePathPrefix}/${url}`}
              />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default ({ data }) => {
  return (
    <Layout showLogoImage={false}>
      <Banner
        image={data.file.childImageSharp.fluid}
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
      />
      <Box flexGrow={1} marginX="auto" width="100%" maxWidth={1280}>
        <Box padding={2}>
          <Articles articles={data.allMdx.edges} />
        </Box>
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    file(relativePath: { eq: "image/avatar/wizard.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 256, maxHeight: 256, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      limit: 6
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            url
            title
            date(formatString: "MMMM Do, YYYY")
            tags
            category
            image {
              childImageSharp {
                fluid(maxWidth: 640, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
