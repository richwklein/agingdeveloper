
import React from "react";
import {Helmet} from "react-helmet";
import {graphql} from "gatsby";
import {Folder} from "@material-ui/icons";
import ArticleGrid from "../components/ArticleGrid";
import IconBanner from "../components/IconBanner";
import Layout from "../components/Layout";

const capitalize = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const CategoryHelmet = ({category, siteTitle}) => {
  return (<Helmet title={`${capitalize(category)} | ${siteTitle}`} />);
};

const CategoryTemplate = ({data, pageContext}) => {
  const category = pageContext.category;
  const banner = <IconBanner icon={<Folder />} title={capitalize(category)} />;

  return (
    <Layout showLogoImage={true} banner={banner}>
      <CategoryHelmet
        category={category}
        siteTitle={data.site.siteMetadata.title} />
      <ArticleGrid articles={data.allMdx.edges} />
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query($category: String) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            slug
            title
            date
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
