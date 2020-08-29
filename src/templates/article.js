import React from "react";
import {graphql, Link} from "gatsby";
import Img from "gatsby-image";
import {Disqus} from "gatsby-plugin-disqus";
import {MDXRenderer} from "gatsby-plugin-mdx";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {
  AccessTime,
  ChevronLeft,
  ChevronRight,
  Event,
} from "@material-ui/icons";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import NewBadge from "../components/NewBadge";
import moment from "moment";
import TagsBox from "../components/TagBar";

const useStyles = makeStyles((theme) => ({

  article: {
    "lineHeight": 1.4,
    "fontFamily": "Merriweather, sans-serif, serif",
    "fontSize": "1.1rem",
    "overflow": "hidden",
    "& blockquote": {
      borderLeft: "3px solid #303032",
      marginLeft: -16,
      paddingLeft: 13,
      fontStyle: "italic",
    },
  },
  articleContent: {
    padding: theme.spacing(2),
  },

  articleTitle: {
    padding: theme.spacing(1, 0),
  },
  articleImage: {
    maxWidth: 1232,
    maxHeight: 693,
  },

  infoBox: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, 0),
    borderTopStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: theme.palette.grey[300],
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.grey[300],
    color: theme.palette.text.secondary,
  },
  infoData: {
    "padding": theme.spacing(0, 1),
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  infoLine1: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(0.5),
  },
  infoLine2: {
    display: "flex",
    alignItems: "center",
  },
  infoAvatar: {
    width: 52,
    height: 52,
  },
  controlBox: {
    display: "flex",
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(4, 0),
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.secondary.main,
  },
}));

const ArticleTitle = ({title}) => {
  const classes = useStyles();

  return (
    <Box component="header" className={classes.articleTitle}>
      <Typography variant="h3">
        {title}
      </Typography>
    </Box>
  );
};

const ArticleInfo = ({author, date, timeToRead}) => {
  const classes = useStyles();
  const readTemplate = `${timeToRead} min read`;
  const {id, name, image} = author;

  return (
    <Box className={classes.infoBox}>
      <Link to={`/author/${id}`} title={name}>
        <Avatar
          component={Img}
          fluid={image.childImageSharp.fluid}
          size="large"
          loading="eager"
          className={classes.infoAvatar} />
      </Link>
      <Box className={classes.infoData}>
        <Typography variant="body2" component="div">
          <Box className={classes.infoLine1}>
            <Event />&nbsp;<time pubdate="pubdate" dateTime={date}>
              {moment(date).format("MMMM Do, YYYY")}
            </time>
          </Box>
          <Box className={classes.infoLine2}>
            <AccessTime />&nbsp;{readTemplate}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

const ArticleControls = ({pathPrefix, previousPath, nextPath}) => {
  const classes = useStyles();

  return (
    <Box component="nav" className={classes.controlBox}>
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
  );
};

const ArticleTemplate = ({data, pageContext}) => {
  const pathPrefix = "/article/";
  const classes = useStyles();

  const {
    frontmatter: {author, image, title, date, category, tags, slug},
    body,
    timeToRead,
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
      <NewBadge fromDate={date}>
        <Paper variant="outlined" className={classes.article}>
          <Img
            fluid={image.childImageSharp.fluid}
            className={classes.articleImage}
          />
          <Box className={classes.articleContent} component="article">
            <ArticleTitle title={title} />
            <ArticleInfo author={author} date={date} timeToRead={timeToRead} />
            <MDXRenderer>{body}</MDXRenderer>
            <TagsBox category={category} tags={tags} />
          </Box>
        </Paper>
      </NewBadge>
      <Box component="aside">
        <ArticleControls pathPrefix={pathPrefix} previousPath={previousPath}
          nextPath={nextPath} />
        <Disqus config={disqusConfig} />
      </Box>
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
      timeToRead
      frontmatter {
        slug
        title
        date
        tags
        category
        author {
          id
          name
          image {
            childImageSharp {
              fluid(maxWidth: 52, maxHeight: 52, cropFocus: NORTH) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 1232, maxHeight: 693, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default ArticleTemplate;
