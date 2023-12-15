import {Box, Grid, Typography} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ExternalLink from "./ExternalLink";

const Copyright = ({title, repository}) => {
  return (
    <Box textAlign="center">
      <Typography variant="caption" align="center">
        &copy;
        {" "}
        {new Date().getFullYear()}
        {" "}
        <ExternalLink to={repository}>{title}</ExternalLink>
      </Typography>
    </Box>
  );
};

Copyright.propTypes = {
  title: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

const PoweredBy = () => {
  return (
    <Box textAlign="center">
      <Typography variant="caption">
        {"Powered by "}
        <ExternalLink to="https://www.gatsbyjs.org/">Gatsby</ExternalLink>
        {" "}
        and
        {" "}
        <ExternalLink to="https://app.netlify.com">Netlify</ExternalLink>
        .
      </Typography>
    </Box>
  );
};

// TODO RSS icon & maybe scroll to top
const PageFooter = ({title, repository}) => {
  return (
    <Grid
      container
      component="footer"
      sx={{p: 2, mt: 4}}
    >
      <Grid item sm={4} xs={12}/>
      <Grid item sm={4} xs={12}>
        <Copyright title={title} repository={repository} />
        <PoweredBy />
      </Grid>
      <Grid item sm={4} xs={12}/>
    </Grid>
  );
};

PageFooter.propTypes = {
  title: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

export default PageFooter;