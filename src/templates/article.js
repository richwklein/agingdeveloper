import React from "react";
import {graphql, Link} from "gatsby";
import Img from "gatsby-image";
import {Disqus, CommentCount} from "gatsby-plugin-disqus";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {
  ChevronLeft,
  ChevronRight,
  LocalOffer} from "@material-ui/icons";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginTop: -theme.spacing(1),
    marginBottom: theme.spacing(3),
    color: theme.palette.grey[600],
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily:
      "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  },
  chip: {
    "padding": theme.spacing(1),
    "marginRight": theme.spacing(2),
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
  const path = slug.replace(prefix, "");
  const pathParts = path.split("/");

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb"
      className={classes.breadcrumbs} >
      <Link to="/" className={classes.breadcrumbLink}>
        Home
      </Link>
      <Link to="/article/" className={classes.breadcrumbLink}>
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

const ArticleTitle = ({title, disqusConfig}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.titleBox} >
      <Grid item xs={12} sm={11}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <CommentCount
          config={disqusConfig}
          className={classes.commentCount}
          placeholder={"..."} />
      </Grid>
    </Grid>
  );
};

const ArticleTags = ({tags}) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      marginTop={1}
      marginBottom={1}>
      {tags.map((tag) => {
        return (
          <Chip
            icon={<LocalOffer />}
            className={classes.chip}
            label={tag}
            key={tag}
            color="primary"
            clickable
            variant="outlined"
            component={Link}
            to={`/tag/${tag}`}
          />
        );
      })}
    </Box>
  );
};

const ArticlePage = ({data, pageContext}) => {
  const pathPrefix = "article";
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
        url={`${siteUrl}/${pathPrefix}/${slug}`}
        siteName={siteName}
        keywords={tags}
        isArticle={true} />
      <ArtitleBreadcrumb slug={slug} />
      <ArticleTitle title={title} disqusConfig={disqusConfig} />
      <Img
        fluid={image.childImageSharp.fluid}
        style={{borderRadius: 6}}
        className={classes.articleImage}
      />
      <ArticleTags tags={tags} />
      <article className={classes.article}>
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      <Box display="flex" className={classes.controlBox}>
        <Box flexGrow={1}>

          {previousPath && (
            <Button component={Link} to={previousPath} color="secondary">
              <ChevronLeft size={8} />
              <Box marginLeft={0.5}>Previous</Box>
            </Button>
          )}
        </Box>
        {nextPath && (
          <Button component={Link} to={nextPath} color="secondary">
            <Box marginRight={0.5}>Next</Box>
            <ChevronRight size={8} />
          </Button>
        )}
      </Box>
      <Disqus config={disqusConfig} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query($currentPath: String!) {
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

export default ArticlePage;
