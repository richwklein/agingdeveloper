import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExternalLink from "./ExternalLink";
import InnerBox from "./InnerBox";

const useStyles = makeStyles((theme) => ({
  footer: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),

    "& a": {
      color: theme.palette.primary.contrastText,
      textDecoration: "none",
      fontSize: ".9rem",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
}));

const BottomBar = ({ copyright, repository }) => {
  const classes = useStyles();

  return (
    <Box component="footer" className={classes.footer}>
      <InnerBox>
        <Box>
          <Box textAlign="center" marginTop={1}>
            <Typography variant="caption">
              &copy; {new Date().getFullYear()}{" "}
              <ExternalLink to={repository}>&nbsp;{copyright}</ExternalLink>
            </Typography>
          </Box>
          <Box textAlign="center">
            Powered by&nbsp;
            <ExternalLink to="https://www.gatsbyjs.org/">Gatsby</ExternalLink>
            &nbsp;and&nbsp;
            <ExternalLink to="https://app.netlify.com">Netlify</ExternalLink>
          </Box>
        </Box>
      </InnerBox>
    </Box>
  );
};

export default BottomBar;
