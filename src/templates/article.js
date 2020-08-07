import React from "react";
import {graphql, Link} from "gatsby";
import Img from "gatsby-image";
import {Disqus} from "gatsby-plugin-disqus";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {
  Box,
  Button,
  Chip,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {
  ChevronLeft,
  ChevronRight} from "@material-ui/icons";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import kebabCase from "lodash/kebabCase";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginTop: -theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[600],
    font: "small",
  },
  breadcrumbLink: {
    color: "inherit",
    textDecoration: "none",
    display: "flex",
    align: "center",
  },
  article: {
    "lineHeight": 1.6,
    "fontFamily": "Merriweather, sans-serif, serif",
    "fontSize": "1.1rem",
    "& blockquote": {
      borderLeft: "3px solid #303032",
      marginLeft: -16,
      paddingLeft: 13,
      fontStyle: "italic",
    },
  },
  articleImage: {
    maxWidth: 1264,
    maxHeight: 711,
  },
  titleBox: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily:
      "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  },
  chip: {
    "padding": theme.spacing(0.5),
    "marginRight": theme.spacing(1),
  },
  controlBox: {
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.secondary.main,
  },
}));

const ArtitleBreadcrumb = ({slug}) => {
  const classes = useStyles();
  const prefix = "/article/";
  const pathParts = slug.split("/").slice(1);

  return (
    <Breadcrumbs separator="/" aria-label="breadcrumb"
      className={classes.breadcrumbs} >
      <Link to="/" className={classes.breadcrumbLink}>
        Home
      </Link>
      <Link to="/article" className={classes.breadcrumbLink}>
        Articles
      </Link>
      {pathParts.map((part, index) => {
        return (
          <Link
            to={`${prefix}` + pathParts.slice(0, index + 1).join("/")}
            key={index}
            className={classes.breadcrumbLink} >
            {part.toLowerCase()}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

const ArticleTitle = ({title}) => {
  const classes = useStyles();

  return (
    <header className={classes.titleBox}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
    </header>
  );
};

const ArticleTags = ({tags}) => {
  const classes = useStyles();

  return (
    <Box
      marginTop={1}
      marginBottom={1}>
      {tags.map((tag) => {
        return (
          <Chip
            className={classes.chip}
            label={tag.toUpperCase()}
            key={tag}
            color="primary"
            clickable
            variant="outlined"
            component={Link}
            to={`/tag/${kebabCase(tag)}`}
          />
        );
      })}
    </Box>
  );
};

const ArticleTemplate = ({data, pageContext}) => {
  const pathPrefix = "/article";
  const classes = useStyles();

  const {
    frontmatter: {image, title, tags, slug},
    body,
  } = data.mdx;
  const {title: siteName, siteUrl} = data.site.siteMetadata;
  const {previousPath, nextPath} = pageContext;
  const disqusConfig = {
    url: `${siteUrl}/${slug}`,
    identifier: slug,
    title: title,
  };

  return (
    <Layout showLogoImage={true}>
      <SEO
        title={title}
        description={title}
        image={`${siteUrl}${image.childImageSharp.fluid.src}`}
        url={`${siteUrl}${pathPrefix}${slug}`}
        siteName={siteName}
        keywords={tags}
        isArticle={true} />
      <ArtitleBreadcrumb slug={slug} />
      <article className={classes.article}>
        <ArticleTitle title={title} disqusConfig={disqusConfig} />
        <Img
          fluid={image.childImageSharp.fluid}
          style={{borderRadius: 6}}
          className={classes.articleImage}
        />
        <ArticleTags tags={tags} />
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      <aside>
        <Box display="flex" className={classes.controlBox}>
          <Box flexGrow={1}>

            {previousPath && (
              <Button
                component={Link}
                to={`${pathPrefix}${previousPath}`}
                color="secondary">
                <ChevronLeft size={8} />
                <Box marginLeft={0.5}>Previous</Box>
              </Button>
            )}
          </Box>
          {nextPath && (
            <Button
              component={Link}
              to={`${pathPrefix}${nextPath}`}
              color="secondary">
              <Box marginRight={0.5}>Next</Box>
              <ChevronRight size={8} />
            </Button>
          )}
        </Box>
        <Disqus config={disqusConfig} />
      </aside>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($currentPath: String) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    mdx(frontmatter: { slug: { eq: $currentPath } }) {
      body
      frontmatter {
        slug
        title
        date
        tags
        category
        image {
          childImageSharp {
            fluid(maxWidth: 1264, maxHeight: 711, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default ArticleTemplate;
