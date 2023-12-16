import React from "react";
import {graphql} from "gatsby";
import {MDXProvider} from "@mdx-js/react";
import MDXLink from "../components/MDXLink";
import ArticleByLine from "../components/ArticleByLine";
import {Box, Divider, Grid} from "@mui/material";
import TitleBlock from "../components/TitleBlock";
import ArticleImage from "../components/ArticleImage";
import ArticleTagGrid from "../components/ArticleTagGrid";
import ArticleTimeToRead from "../components/ArticleTimeToRead";
import {useSiteData} from "../hooks/useSiteData";
import PropTypes from "prop-types";
import {ChildrenProps} from "../props";

const components = {
  a: MDXLink,
};

// TODO image propertype and head-seo
const ArticleTemplate = ({data: {mdx}, children}) => {
  const {lang} = useSiteData();
  const {frontmatter: {title, description, author, featured, date, category, tags},
    fields: {timeToRead}} = mdx;
  return (
    <Box component="article" sx={{
      "lineHeight": 1.4,
      "fontFamily": "Merriweather, Merriweather Sans, sans-serif, serif",
      "fontSize": "1.1rem",
    }}>
      <ArticleByLine
        author={author}
        date={date} />
      <TitleBlock title={title} subtitle={description } />
      <ArticleImage
        author={featured.author}
        site={featured.site}
        image={featured.image.childImageSharp.gatsbyImageData} />
      <Grid container direction="row-reverse" spacing={2}>
        <Grid item md={3} sm={12} xs={12}>
          <ArticleTimeToRead minutes={timeToRead.minutes} words={timeToRead.words} lang={lang} />
        </Grid>
        <Grid item md={9} sm={12} xs={12}>
          <MDXProvider components={components}>
            {children}
          </MDXProvider>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{my: 2}} />
      <ArticleTagGrid category={category} tags={tags} />
    </Box>
  );
};

ArticleTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        author: PropTypes.object.isRequired,
        featured: PropTypes.shape({
          author: PropTypes.object.isRequired,
          site: PropTypes.object.isRequired,
          image: PropTypes.any,
        }).isRequired,
      }).isRequired,
      fields: PropTypes.shape({
        timeToRead: PropTypes.shape({
          minutes: PropTypes.number.isRequired,
          words: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  children: ChildrenProps,
};

export const Head = ({data: {mdx}}) => {
  const {frontmatter: {title}} = mdx;
  return (<title>{title}</title>);
};

export const pageQuery = graphql`
  query($pathSuffix: String) {
    mdx(frontmatter: { slug: { eq: $pathSuffix } }) {
      fields {
          timeToRead {
            minutes
            words
          }
      }
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
                layout: CONSTRAINED
                aspectRatio: 2.33
              )
          }
          }
        }
      }
    }
  }
`;

export default ArticleTemplate;
