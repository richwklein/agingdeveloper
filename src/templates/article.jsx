import React from "react";
import {graphql} from "gatsby";
import {MDXProvider} from "@mdx-js/react";
import MDXLink from "../components/common/MDXLink";
import ByLine from "../components/article/ByLine";
import {Box, Grid} from "@mui/material";
import TitleBlock from "../components/article/TitleBlock";
import FeaturedImage from "../components/article/FeaturedImage";
import TagBar from "../components/article/TagBar";

const components = {
  a: MDXLink,
};

const ArticleTemplate = ({data: {mdx}, children}) => {
  const {frontmatter: {title, description, author, featured, date, category, tags}} = mdx;
  return (
    <Box component="article" sx={{
      "lineHeight": 1.4,
      "fontFamily": "Merriweather, Merriweather Sans, sans-serif, serif",
      "fontSize": "1.1rem",
    }}>
      <ByLine
        author={author}
        category={category}
        date={date} />
      <TitleBlock title={title} description={description } />
      <FeaturedImage
        authorName={featured.author.name}
        authorUrl={featured.author.url}
        siteName={featured.site.name}
        siteUrl={featured.site.url}
        image={featured.image.childImageSharp.gatsbyImageData} />
      <Box component="hr" sx={{
        border: 0,
        borderTopWidth: "1px",
        borderTopStyle: "dashed",
        borderTopColor: "primary.dark",
      }} />
      <Grid container spacing={2}>
        <Grid item lg={9} sm={12}>
          <MDXProvider components={components}>
            {children}
          </MDXProvider>
          <TagBar tags={tags} />
        </Grid>
        <Grid item lg={3} sm={12}>

        </Grid>
      </Grid>
    </Box>
  );
};

export default ArticleTemplate;

export const Head = ({data: {mdx}}) => {
  const {frontmatter: {title}} = mdx;
  return (<title>{title}</title>);
};

export const pageQuery = graphql`
  query($currentPath: String) {
    mdx(frontmatter: { slug: { eq: $currentPath } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        category
        tags
        author {
          name
          slug
        }
        featured {
          author {
            name
            url
          }
          site {
            name
            url
          }
          image {
            childImageSharp {
              gatsbyImageData(
                width: 1200, 
                placeholder: BLURRED
                layout: FIXED
              )
          }
          }
        }
      }
    }
  }
`;

