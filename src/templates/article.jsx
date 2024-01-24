import React from "react";
import {MDXProvider} from "@mdx-js/react";
import {Box, Divider, Grid} from "@mui/material";
import {graphql} from "gatsby";
import PropTypes from "prop-types";
import {ArticleByLine} from "../components/ArticleByLine";
import ArticleImage from "../components/ArticleImage";
import ArticleTagGrid from "../components/ArticleTagGrid";
import ArticleTimeToRead from "../components/ArticleTimeToRead";
import MDXCode from "../components/MDXCode";
import MDXLink from "../components/MDXLink";
import PageSEO from "../components/PageSEO";
import TitleBlock from "../components/TitleBlock";
import {useSiteData} from "../hooks/useSiteData";
import {ChildrenProps, FrontmatterProps, TimeToReadDigestProps} from "../props";

const components = {
  pre: MDXCode,
  a: MDXLink,
};

/**
 * React component that renders a page as an article.
 *
 * @param {ArticleTemplateProps} props - The article template page props.
 * @return {React.ReactElement} - The react component.
 */
const ArticleTemplate = ({data: {mdx}, children}) => {
  const {lang} = useSiteData();
  const {frontmatter: {title, description, author, featured, published, category, tags},
    fields: {timeToRead}} = mdx;
  return (
    <Box component="article" sx={{
      "lineHeight": 1.4,
      "fontFamily": "Merriweather, Merriweather Sans, sans-serif, serif",
      "fontSize": "1.1rem",
    }}>
      <ArticleByLine
        author={author}
        published={published} />
      <TitleBlock title={title} subtitle={description} />
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

/**
 * @typedef ArticleTemplateProps - The article template props
 * @property {Object} data - The page data.
 * @property {Object} data.mdx - The mdx node.
 * @property {FrontmatterProps} data.mdx.frontmatter - The frontmatter of the node.
 * @property {Object} data.mdx.fields - The additional fields on the node.
 * @property {TimeToReadDigestProps} data.mdx.fields.timeToRead - The article time to read.
 * @property {Object} pageContext - The additional context passed to the page.
 * @property {string} pageContext.pathSuffix - The suffix (slug) of the url for these pages.
 * @property {ChildrenProps} children - The rendered mdx as child components.
 */
ArticleTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: FrontmatterProps.isRequired,
      fields: PropTypes.shape({
        timeToRead: TimeToReadDigestProps.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    pathSuffix: PropTypes.string.isRequired,
  }),
  children: ChildrenProps,
};

export default ArticleTemplate;

// eslint-disable-next-line react/prop-types
export const Head = ({data: {mdx}, pageContext: {pathSuffix}}) => {
  // eslint-disable-next-line react/prop-types, max-len
  const {frontmatter: {title, description, author: {twitterUsername}, featured: {image: {publicURL}}}} = mdx;

  return <PageSEO
    title={title}
    description={description}
    path={`/article/${pathSuffix}`}
    image={publicURL}
    ogType="article"
    twitterCreator={twitterUsername} />;
};

export const pageQuery = graphql`
  query($pathSuffix: String!) {
    mdx(frontmatter: { slug: { eq: $pathSuffix } }) {
      fields {
          timeToRead {
            minutes
            words
          }
      }
      frontmatter {
        published(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        category
        tags
        author {
          name
          slug
          twitterUsername
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
            publicURL
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
