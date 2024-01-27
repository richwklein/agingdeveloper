import React from "react";
import {GitHub, RssFeed} from "@mui/icons-material";
import {Box, ButtonGroup, Grid, IconButton, Typography} from "@mui/material";
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
const Copyright = ({title}) => {
  return (
    <Box sx={{textAlign: "center"}}>
      <Typography variant="caption">
        &copy;
        {" "}
        {new Date().getFullYear()}
        {" "}
        {title}
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
};

/**
 * React component used to render the action buttons.
 *
 * @param {ActionButtonsProps} props - The action button props.
 * @return {React.ReactElement}
 *
 * @example
 * <FeedButton />
 *
 * @ignore
 */
const ActionButtons = ({title, repository}) => {
  return (
    <Box sx={{textAlign: "left"}}>
      <ButtonGroup>
        <IconButton component={ExternalLink}
          title={`${title} - Feed`}
          to={"/atom.xml"}>
          <RssFeed color="primary" />
        </IconButton>
        <IconButton component={ExternalLink}
          title={`${title} - Repository`}
          to={repository}>
          <GitHub color="primary" />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

/**
 * @typedef FeedButtonProps - The copyright props.
 * @property {string} title - The title of the site.
 */
ActionButtons.propTypes = {
  title: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
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
      <InnerContainer>
        <Grid container>
          <Grid item sm={4} xs={12}>
            <ActionButtons title={title} repository={repository} />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Copyright title={title} />
          </Grid>
          <Grid item sm={4} xs={12} />
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
