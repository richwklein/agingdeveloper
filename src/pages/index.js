import React from "react";
import { graphql } from "gatsby";
import { Grid } from "@material-ui/core";
import ArticleCard from "../components/ArticleCard";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

const ArticleGrid = ({ articles }) => {
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

const IndexBanner = ({ avatar, title, subtitle }) => {
  return <Banner avatar={avatar} title={title} subtitle={subtitle} />;
};

const IndexPage = ({ data }) => {
  const avatar = data.file.childImageSharp.fluid;
  const { title, description: subtitle } = data.site.siteMetadata;
  const banner = IndexBanner({ avatar, title, subtitle });

  return (
    <Layout showLogoImage={false} banner={banner}>
      <Helmet>
        <time>{title}</time>
      </Helmet>
      <ArticleGrid articles={data.allMdx.edges} />
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
            url
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
