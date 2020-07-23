import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExternalLink from "./ExternalLink";

const useStyles = makeStyles((theme) => ({
  footer: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,

    "& a": {
      color: theme.palette.secondary.contrastText,
      textDecoration: "none",
      fontSize: ".9rem",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  topButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default ({ hasScroll = false }) => {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          repository
        }
      }
    }
  `);

  return (
    <Box component="footer" className={classes.footer}>
      <Container maxWidth="md">
        <Box padding={4}>
          <Box textAlign="center" marginTop={1}>
            <Typography variant="caption">
              &copy; {new Date().getFullYear()}{" "}
              <ExternalLink to={data.site.siteMetadata.repository}>
                &nbsp;{data.site.siteMetadata.siteTitle}
              </ExternalLink>
            </Typography>
          </Box>
          <Box textAlign="center">
            Powered by&nbsp;
            <ExternalLink to="https://www.gatsbyjs.org/">Gatsby</ExternalLink>
            &nbsp;and&nbsp;
            <ExternalLink to="https://app.netlify.com">Netlify</ExternalLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
