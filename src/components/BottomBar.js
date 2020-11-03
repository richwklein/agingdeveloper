import React from "react";
import {Box, Grid, IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ExternalLink from "./ExternalLink";
import {RssFeed} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  footer: {
    "color": theme.palette.primary.contrastText,
    "backgroundColor": theme.palette.primary.main,
    "padding": theme.spacing(2),

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

const BottomBar = ({title, repository}) => {
  const classes = useStyles();

  return (
    <Grid container component="footer" className={classes.footer}>
      <Grid item sm={12} md={4}>
        <IconButton component={ExternalLink}
          title={`${title} RSS`}
          to={"/rss.xml"}>
          <RssFeed color="secondary" />
        </IconButton>
      </Grid>
      <Grid item sm={12} md={4}>
        <Box>
          <Box textAlign="center">
            <Typography variant="caption">
              &copy; {new Date().getFullYear()}{" "}
              <ExternalLink to={repository}>&nbsp;{title}</ExternalLink>
            </Typography>
          </Box>
          <Box textAlign="center">
            Powered by&nbsp;
            <ExternalLink to="https://www.gatsbyjs.org/">Gatsby</ExternalLink>
            &nbsp;and&nbsp;
            <ExternalLink to="https://app.netlify.com">Netlify</ExternalLink>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={12} md={4}></Grid>
    </Grid>
  );
};

export default BottomBar;
