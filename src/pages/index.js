import React from "react";
import {graphql, Link} from "gatsby";
import {Box, Button, Grid} from "@material-ui/core";
import {Storage} from "@material-ui/icons";

import ArticleCard from "../components/ArticleCard";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const ArticleGrid = ({articles}) => {
  return (
    <Grid container spacing={3}>
      {articles.map(
          ({
            node: {
              excerpt,
              frontmatter: {image, title, date, slug},
            },
          }) => {
            return (
              <Grid item xs={12} sm={6} key={slug}>
                <ArticleCard
                  image={image}
                  title={title}
                  date={date}
                  excerpt={excerpt}
                  slug={slug}
                />
              </Grid>
            );
          },
      )}
    </Grid>
  );
};

const indexBanner = ({avatar, title, subtitle}) => {
  return <Banner avatar={avatar} title={title} subtitle={subtitle} />;
};

const IndexPage = ({data}) => {
  const avatar = data.file.childImageSharp.fluid;
  const {title, description: subtitle, siteUrl} = data.site.siteMetadata;
  const banner = indexBanner({avatar, title, subtitle});

  return (
    <Layout showLogoImage={false} banner={banner}>
      <SEO
        title={title}
        description={subtitle}
        image={`${siteUrl}${avatar.src}`}
        url={`${siteUrl}/`}
        siteName={title} />
      <ArticleGrid articles={data.allMdx.edges} />
      <Box
        display="flex"
        alignItems="center"
        marginTop={2}
        justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={"/article"}
          startIcon={<Storage />}
        >
          View All
        </Button>
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    file(relativePath: { eq: "image/avatar/wizard.jpg" }) {
      childImageSharp {
        fluid(cropFocus: CENTER) {
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
            slug
            title
            date(formatString: "MMMM Do, YYYY")
            tags
            category
            image {
              childImageSharp {
                fluid(cropFocus: CENTER) {
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

export default IndexPage;
