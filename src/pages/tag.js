import React from "react";
import {graphql, Link} from "gatsby";
import {Badge, Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import Layout from "../components/Layout";
import {Helmet} from "react-helmet";
import {LocalOffer} from "@material-ui/icons";
import kebabCase from "lodash/kebabCase";
import IconBanner from "../components/IconBanner";

const useStyles = makeStyles((theme) => ({
  badge: {
    position: "relative",
    right: -4,
    transform: "none",
  },
}));

const TagHelmet = ({siteTitle}) => {
  return (<Helmet title={`Tags | ${siteTitle}`} />);
};

const TagGrid = ({tags}) => {
  const classes=useStyles();

  return (
    <Grid container spacing={3}>
      {tags.map((tag) => {
        return (
          <Grid item lg={2} md={3} sm={6} xs={12} key={tag.fieldValue}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              component={Link}
              to={`/tag/${kebabCase(tag.fieldValue)}`}
              endIcon={<Badge
                badgeContent={tag.totalCount}
                color="secondary"
                max={999}
                overlap="rectangle"
                classes={{anchorOriginTopRightRectangle: classes.badge}} />}>
              {tag.fieldValue}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

const tagBanner = () => {
  return <IconBanner icon={<LocalOffer />} title="Tags" />;
};

const TagPage = ({data}) => {
  const {group: tags} = data.allMdx;
  const banner = tagBanner();

  return (
    <Layout showLogoImage={true} banner={banner}>
      <TagHelmet siteTitle={data.site.siteMetadata.title} />
      <TagGrid tags={tags} />
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
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagPage;
