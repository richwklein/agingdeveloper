import React from "react";
import {graphql, Link} from "gatsby";
import Img from "gatsby-image";
import {Helmet} from "react-helmet";
import {
  Avatar,
  Button,
  Grid,
} from "@material-ui/core";
import {Person} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import IconBanner from "../components/IconBanner";
import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 32,
    height: 32,
  },
}));

const AuthorHelmet = ({siteTitle}) => {
  return (<Helmet title={`Authors | ${siteTitle}`} />);
};

const AuthorButton = ({author}) => {
  const classes = useStyles();
  const {id, name, image} = author;

  const url = "/author/" + id;
  return (
    <Button component={Link} to={url}
      color="primary"
      variant="contained"
      fullWidth
      startIcon={<Avatar
        component={Img}
        fluid={image.childImageSharp.fluid}
        loading="eager"
        className={classes.avatar} />} >
      {name}
    </Button>
  );
};

const AuthorGrid = ({authors}) => {
  return (
    <Grid container spacing={4}>
      {authors.map(({node}, index) => {
        return (
          <Grid item lg={2} md={3} sm={6} xs={12} key={node.id}>
            <AuthorButton author={node} />
          </Grid>
        );
      },
      )}
    </Grid>
  );
};

const AuthorPage = ({data}) => {
  const banner = <IconBanner icon={<Person />} title="Authors" />;

  return (
    <Layout showLogoImage={true} banner={banner}>
      <AuthorHelmet siteTitle={data.site.siteMetadata.title} />
      <AuthorGrid authors={data.allAuthorYaml.edges} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allAuthorYaml(
      sort: { fields: name, order: DESC }
    ) {
      edges {
        node {
          id
          name
          image {
            childImageSharp {
              fluid(maxWidth: 32, maxHeight: 32, cropFocus: NORTH) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;

export default AuthorPage;
