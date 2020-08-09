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
  ChevronRight,
  Folder,
  LocalOffer} from "@material-ui/icons";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import kebabCase from "lodash/kebabCase";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    "marginTop": -theme.spacing(1),
    "marginBottom": theme.spacing(2),
    "color": theme.palette.text.secondary,
    "fontFamily": theme.typography.caption.fontFamily,
    "fontSize": theme.typography.caption.fontSize,
    "fontWeight": theme.typography.caption.fontWeight,
    "lineHeight": theme.typography.caption.lineHeight,

    "& a": {
      color: "inherit",
      textDecoration: "none",
    },

    "& a:hover": {
      textDecoration: "underline",
    },

    "& a[disabled]": {
      color: theme.palette.text.disabled,
      textDecoration: "none",
      cursor: "default",
    },
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

const ArtitleBreadcrumb = ({date, title, slug}) => {
  const classes = useStyles();
  const momentDate = moment(date);
  const yearPath = "/article/" + momentDate.year();
  const monthPath = yearPath + "/" + momentDate.format("MM");
  const dayPath = monthPath + "/" + momentDate.format("DD");

  return (
    <Breadcrumbs separator="/" aria-label="breadcrumb"
      className={classes.breadcrumbs} >
      <Link to="/">
        Home
      </Link>
      <Link to="/article">
        Articles
      </Link>
      <Link to={yearPath}>
        {momentDate.format("YYYY")}
      </Link>
      <Link to={monthPath} >
        {momentDate.format("MMMM")}
      </Link>
      <Link to={dayPath} >
        {momentDate.format("DD")}
      </Link>
      <Link to={`/article${slug}`} disabled>
        {title}
      </Link>
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

const ArticleTags = ({category, tags}) => {
  const classes = useStyles();

  return (
    <Box
      marginTop={1}
      marginBottom={1}>
      <Chip
        className={classes.chip}
        icon={<Folder />}
        label={category.toUpperCase()}
        key={category}
        clickable
        variant="outlined"
        color="primary"
        component={Link}
        size="small"

        to={`/category/${kebabCase(category)}`} />
      {tags.map((tag) => {
        return (
          <Chip
            className={classes.chip}
            icon={<LocalOffer />}
            label={tag.toUpperCase()}
            key={tag}
            clickable
            variant="outlined"
            color="primary"
            component={Link}
            size="small"
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
    frontmatter: {image, title, date, category, tags, slug},
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
      <ArtitleBreadcrumb date={date} title={title} slug={slug} />
      <article className={classes.article}>
        <ArticleTitle title={title} disqusConfig={disqusConfig} />
        <Img
          fluid={image.childImageSharp.fluid}
          style={{borderRadius: 6}}
          className={classes.articleImage}
        />
        <ArticleTags category={category} tags={tags} />
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
