
import React from "react";
import {Helmet} from "react-helmet";
import {graphql} from "gatsby";
import {
  GridList,
  GridListTile,
  Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";

const capitalize = (tag) => {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
};

const useStyles = makeStyles((theme) => ({
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
