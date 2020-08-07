import React from "react";
import {graphql, Link} from "gatsby";
import {Badge, Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import Layout from "../components/Layout";
import {Helmet} from "react-helmet";
import {Folder} from "@material-ui/icons";
import kebabCase from "lodash/kebabCase";
import IconBanner from "../components/IconBanner";

const useStyles = makeStyles((theme) => ({
  badge: {
    position: "relative",
    right: -4,
    transform: "none",
  },
}));

const CategoryHelmet = ({siteTitle}) => {
  return (<Helmet title={`Categories | ${siteTitle}`} />);
};

const CategoryGrid = ({categories}) => {
  const classes=useStyles();

  return (
    <Grid container spacing={3}>
      {categories.map((category) => {
        return (
          <Grid item lg={2} md={3} sm={6} xs={12} key={category.fieldValue}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              component={Link}
              to={`/category/${kebabCase(category.fieldValue)}`}
              endIcon={<Badge
                badgeContent={category.totalCount}
                color="secondary"
                max={999}
                overlap="rectangle"
                classes={{anchorOriginTopRightRectangle: classes.badge}} />}>
              {category.fieldValue}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

const categoryBanner = () => {
  return <IconBanner icon={<Folder />} title="Categories" />;
};

const CategoryPage = ({data}) => {
  const {group: categories} = data.allMdx;
  const banner = categoryBanner();

  return (
    <Layout showLogoImage={true} banner={banner}>
      <CategoryHelmet siteTitle={data.site.siteMetadata.title} />
      <CategoryGrid categories={categories} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    allMdx {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default CategoryPage;
