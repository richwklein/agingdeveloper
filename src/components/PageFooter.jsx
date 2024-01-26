import React from "react";
import {RssFeed} from "@mui/icons-material";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import PropTypes from "prop-types";
import ExternalLink from "./ExternalLink";
import InnerContainer from "./InnerContainer";

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
    <Box sx={{textAlign: "center"}}>
      <Typography variant="caption">
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
    <Box sx={{textAlign: "center"}}>
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
 * React component used to render the feed button.
 *
 * @param {FeedButtonProps} props - The copyright props.
 * @return {React.ReactElement}
 *
 * @example
 * <FeedButton />
 *
 * @ignore
 */
const FeedButton = ({title}) => {
  return (
    <Box sx={{textAlign: "right"}}>
      <IconButton component={ExternalLink}
        title={`${title} - Feed`}
        to={"/feed.json"}>
        <RssFeed color="primary" />
      </IconButton>
    </Box>
  );
};

/**
 * @typedef FeedButtonProps - The copyright props.
 * @property {string} title - The title of the site.
 */
FeedButton.propTypes = {
  title: PropTypes.string.isRequired,
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
export const PageFooter = ({title, repository}) => {
  return (
    <Box component="footer" sx={{p: 2, mt: 6, mb: 2}} >
      <InnerContainer tag="footer">
        <Grid container>
          <Grid item sm={4} xs={12} />
          <Grid item sm={4} xs={12}>
            <Copyright title={title} repository={repository} />
            <PoweredBy />
          </Grid>
          <Grid item sm={4} xs={12}>
            <FeedButton title={title} />
          </Grid>
        </Grid>
      </InnerContainer>
    </Box>
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
