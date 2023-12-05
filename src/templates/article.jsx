import React from "react";
import {graphql} from "gatsby";
import {MDXProvider} from "@mdx-js/react";
import MDXLink from "../components/common/MDXLink";
import ByLine from "../components/article/ByLine";
import {Box, Card, Grid, Stack, Typography} from "@mui/material";
import TitleBlock from "../components/article/TitleBlock";
import FeaturedImage from "../components/article/FeaturedImage";
import TagBlock from "../components/article/TagBlock";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TimeToRead from "../components/article/TimeToRead";
import {useSiteData} from "../hooks/useSiteData";

const components = {
  a: MDXLink,
};

const ArticleTemplate = ({data: {mdx}, children}) => {
  const {lang} = useSiteData();
  const {frontmatter: {title, description, author, featured, date, category, tags}, fields: {timeToRead}, tableOfContents} = mdx;
  return (
    <Box component="article" sx={{
      "lineHeight": 1.4,
      "fontFamily": "Merriweather, Merriweather Sans, sans-serif, serif",
      "fontSize": "1.1rem",
    }}>
      <ByLine
        author={author}
        date={date} />
      <TitleBlock title={title} description={description } />
      <FeaturedImage
        author={featured.author}
        site={featured.site}
        image={featured.image.childImageSharp.gatsbyImageData} />
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item lg={3} sm={12}>
          <TimeToRead minutes={timeToRead.minutes} words={timeToRead.words} lang={lang} />
        </Grid>
        <Grid item lg={9} sm={12}>
          <MDXProvider components={components}>
            {children}
          </MDXProvider>
          <TagBlock category={category} tags={tags} />
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
      fields {
          timeToRead {
            minutes
            words
          }
      }
      tableOfContents
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
                width: 1152, 
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

