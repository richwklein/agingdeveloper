import React from "react";
import {graphql, Link} from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import {Box, Button, Paper, Typography} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({

  page: {
    lineHeight: 1.4,
    fontFamily: "Merriweather, sans-serif, serif",
    fontSize: "1.1rem",
    overflow: "hidden",
  },
  pageContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },

  pageTitle: {
    padding: theme.spacing(1, 0),
  },
  pageImage: {
    maxWidth: 1232,
    maxHeight: 693,
  },
  pageControls: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2),
    justifyContent: "flex-end",
  },
}));

const Page404 = ({data}) => {
  const classes = useStyles();
  const fluidImage = data.file.childImageSharp.fluid;

  return (
    <Layout showLogoImage={true}>
      <Paper variant="outlined" className={classes.page}>
        <Img
          fluid={fluidImage}
          className={classes.pageImage}
        />
        <Box className={classes.pageContent} component="article">

          <Box component="header" className={classes.pageTitle}>
            <Typography variant="h3">
              404 &ndash; Page Not Found
            </Typography>
          </Box>
          <Box componenent="p">
              The page you are looking for might have been removed,<br/>
              had it's name changed, or be temporarily unavailable.
          </Box>
        </Box>
        <Box className={classes.pageControls}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={"/"}
            startIcon={<Home />}
          >
                Return Home
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    file(relativePath: { eq: "image/randy-laybourne-Ens_NuuHVO4-unsplash.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1232, maxHeight: 693, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Page404;
