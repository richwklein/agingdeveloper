import React from "react";
import {graphql} from "gatsby";
import {Grid} from "@material-ui/core";
import ArticleCard from "../components/ArticleCard";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const ArticleGrid = ({articles}) => {
  const articlePathPrefix = "/archive";

  return (
    <Grid container spacing={3}>
      {articles.map(
          ({
            node: {
              excerpt,
              frontmatter: {image, title, date, url},
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
