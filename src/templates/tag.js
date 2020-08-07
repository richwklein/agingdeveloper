
import React from "react";
import {Helmet} from "react-helmet";
import {graphql, Link} from "gatsby";
import {
  Breadcrumbs,
  GridList,
  GridListTile,
  Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Layout from "../components/Layout";
import kebabCase from "lodash/kebabCase";
import ArticleCard from "../components/ArticleCard";

const capitalize = (tag) => {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
};

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

    "& a.disabled": {
      color: theme.palette.text.disabled,
      textDecoration: "none",
      cursor: "default",
    },
  },

  titleBox: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily:
      "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  },
}));

const TagTitle = ({tag}) => {
  const classes = useStyles();

  return (
    <header className={classes.titleBox}>
      <Typography variant="h4" className={classes.title}>
        {capitalize(tag)}
      </Typography>
    </header>
  );
};

const TagHelmet = ({tag, siteTitle}) => {
  return (<Helmet title={`${capitalize(tag)} | ${siteTitle}`} />);
};

const TagBreadcrumb = ({tag}) => {
  const classes = useStyles();

  return (
    <Breadcrumbs separator="/" aria-label="breadcrumb"
      className={classes.breadcrumbs} >
      <Link to="/">
      Home
      </Link>
      <Link to="/tag">
      Tags
      </Link>
      <Link to={`/tag/${kebabCase(tag)}`} disabled className="disabled">
        {capitalize(tag)}
      </Link>
    </Breadcrumbs>
  );
};

const ArticleGridList = ({articles}) => {
  return (
    <GridList cellHeight={570} cols={2} spacing={24}>
      {articles.map(
          ({
            node: {
              excerpt,
              frontmatter: {image, title, date, slug},
            },
          }) => {
            return (
              <GridListTile cols={1} key={slug}>
                <ArticleCard
                  image={image}
                  title={title}
                  date={date}
                  excerpt={excerpt}
                  slug={slug}
                />
              </GridListTile>
            );
          },
      )}
    </GridList>
  );
};

const TagTemplate = ({data, pageContext}) => {
  const tag = pageContext.tag;

  return (
    <Layout showLogoImage={true}>
      <TagHelmet tag={tag} siteTitle={data.site.siteMetadata.title} />
      <TagBreadcrumb tag={tag} />
      <TagTitle tag={tag} />
      <ArticleGridList articles={data.allMdx.edges} />
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
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            slug
            title
            date(formatString: "MMMM Do, YYYY")
            tags
            category
            image {
              childImageSharp {
                fluid(cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
