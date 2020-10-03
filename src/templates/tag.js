
import React from "react";
import {Helmet} from "react-helmet";
import {graphql} from "gatsby";
import {LocalOffer} from "@material-ui/icons";
import ArticleGrid from "../components/ArticleGrid";
import IconBanner from "../components/IconBanner";
import Layout from "../components/Layout";

const capitalize = (tag) => {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
};

const TagHelmet = ({tag, siteTitle}) => {
  return (<Helmet title={`${capitalize(tag)} | ${siteTitle}`} />);
};


const TagTemplate = ({data, pageContext}) => {
  const tag = pageContext.tag;
  const banner = <IconBanner icon={<LocalOffer />} title={capitalize(tag)} />;

  return (
    <Layout showLogoImage={true} banner={banner}>
      <TagHelmet tag={tag} siteTitle={data.site.siteMetadata.title} />
      <ArticleGrid articles={data.allMdx.edges} />
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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
                fluid(maxWidth: 1232, maxHeight: 693, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
