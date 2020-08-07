
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

const capitalize = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

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
  titleBox: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily:
      "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  },
}));

const CategoryTitle = ({category}) => {
  const classes = useStyles();

  return (
    <header className={classes.titleBox}>
      <Typography variant="h4" className={classes.title}>
        {capitalize(category)}
      </Typography>
    </header>
  );
};

const CategoryHelmet = ({category, siteTitle}) => {
  return (<Helmet title={`${capitalize(category)} | ${siteTitle}`} />);
};

const CategoryBreadcrumb = ({category}) => {
  const classes = useStyles();

  return (
    <Breadcrumbs separator="/" aria-label="breadcrumb"
      className={classes.breadcrumbs} >
      <Link to="/" className={classes.breadcrumbLink}>
      Home
      </Link>
      <Link to="/category" className={classes.breadcrumbLink}>
      Categories
      </Link>
      <Link
        to={`/category/${kebabCase(category)}`}
        className={classes.breadcrumbLink}>
        {capitalize(category)}
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

const CategoryTemplate = ({data, pageContext}) => {
  const category = pageContext.category;

  return (
    <Layout showLogoImage={true}>
      <CategoryHelmet
        category={category}
        siteTitle={data.site.siteMetadata.title} />
      <CategoryBreadcrumb category={category} />
      <CategoryTitle category={category} />
      <ArticleGridList articles={data.allMdx.edges} />
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query($category: String) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { frontmatter: { category: { eq: $category } } }
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
