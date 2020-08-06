import React from "react";
import {graphql, Link} from "gatsby";
import {Badge, Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import Layout from "../components/Layout";
import {Helmet} from "react-helmet";
import {LocalOffer} from "@material-ui/icons";
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
  titleBox: {
    marginBottom: theme.spacing(4),
  },
  title: {
    fontFamily:
      "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  },
  titleIcon: {
    marginRight: theme.spacing(1),
  },
  badge: {
    position: "relative",
    right: -4,
    transform: "none",
  },
}));

const TagTitle = () => {
  const classes = useStyles();

  return (
    <header className={classes.titleBox}>
      <Typography variant="h4" className={classes.title}>
        <LocalOffer className={classes.titleIcon} />Tags
      </Typography>
    </header>
  );
};

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

const TagPage = ({data}) => {
  const {group: tags} = data.allMdx;

  return (
    <Layout showLogoImage={true}>
      <TagHelmet siteTitle={data.site.siteMetadata.title} />
      <TagTitle />
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
