import React from "react";
import {graphql, Link} from "gatsby";
import {Box, Button} from "@material-ui/core";
import {List as ListIcon} from "@material-ui/icons";
import ArticleGrid from "../components/ArticleGrid";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import FeedLinks from "../components/FeedLinks";


const IndexPage = ({data}) => {
  const avatar = data.file.childImageSharp.fluid;
  const {title, description: subtitle, siteUrl} = data.site.siteMetadata;
  const banner = <Banner avatar={avatar} title={title} subtitle={subtitle} />;

  return (
    <Layout showLogoImage={false} banner={banner}>
      <FeedLinks siteName={title} siteUrl={siteUrl} />
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
          startIcon={<ListIcon />}
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
        fluid(maxWidth: 1232, maxHeight: 693, cropFocus: CENTER) {
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

export default IndexPage;
