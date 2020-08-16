import React from "react";
import {graphql} from "gatsby";
import {Helmet} from "react-helmet";
import {List as ListIcon} from "@material-ui/icons";
import ArticleGrid from "../components/ArticleGrid";
import IconBanner from "../components/IconBanner";
import Layout from "../components/Layout";

const ArticleHelmet = ({siteTitle}) => {
  return (<Helmet title={`Articles | ${siteTitle}`} />);
};

const ArticlePage = ({data}) => {
  const banner = <IconBanner icon={<ListIcon />} title="Articles" />;

  return (
    <Layout showLogoImage={true} banner={banner}>
      <ArticleHelmet siteTitle={data.site.siteMetadata.title} />
      <ArticleGrid articles={data.allMdx.edges} />

    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
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

export default ArticlePage;
