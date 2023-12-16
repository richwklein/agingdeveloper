import {Box, Grid, Typography} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ExternalLink from "./ExternalLink";

/**
 * React component used to render the copyright of the site.
 *
 * @param {CopyrightProps} props - The copyright props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <Copyright title={title} repository={repository} />
 *
 * @ignore
 */
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

/**
 * @typedef CopyrightProps - The copyright props.
 * @property {string} title - The title of the site.
 * @property {string} repository - The repository the site code is in.
 */
Copyright.propTypes = {
  title: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

/**
 * React component used to render the powered by line.
 *
 * @return {React.ReactElement}
 *
 * @example
 * <PoweredBy />
 *
 * @ignore
 */
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

/**
 * React component used to render the page footer.
 *
 * @param {PageFooterProps} props - The page footer props.
 * @return {React.ReactElement}
 *
 * @example
 * <PageFooter title={title} repository={repository} />
 *
 * @todo RSS icon & maybe scroll to top
 */
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

/**
 * @typedef PageFooterProps - The page footer props.
 * @property {string} title - The title of the site.
 * @property {string} repository - The repository the site code is in.
 */
PageFooter.propTypes = {
  title: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

export default PageFooter;
