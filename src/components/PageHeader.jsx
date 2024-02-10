import React from "react";
import {AppBar, Avatar, Box, ButtonBase, Toolbar, Typography} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import PropTypes from "prop-types";
import InnerContainer from "./InnerContainer";
import InternalLink from "./InternalLink";

/**
 * React component used to render the page avatar.
 *
 * @param {PageAvatarProps} props - The page avatar props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <PageAvatar image={image} title={title} />
 */
export const PageAvatar = ({image, title}) => {
  return (<Avatar
    variant="rounded"
    sx={(theme) => ({
      bgcolor: "primary.dark",
      borderWidth: 1,
      borderColor: "secondary.light",
      borderStyle: "solid",
      [theme.breakpoints.up("sm")]: {
        width: "72px",
        height: "72px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "48px",
        height: "48px",
      },
    })}>
    <GatsbyImage image={image} sx={{backgroundColor: "inherit"}} alt={title} />
  </Avatar>);
};

/**
 * @typedef PageAvatarProps - The page avatar props.
 * @property {GatsbyImageData} image - The gatsby image data for the site avatar.
 * @property {string} title - The title of the site.
 */
PageAvatar.propTypes = {
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

/**
 * React component used to render the page header.
 *
 * @param {PageHeaderProps} props - The page header props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <PageHeader
 *   title={title}
 *   tagline={tagline}
 *   avatar={avatar}
 * />
 */
export const PageHeader = ({title, tagline, avatar}) => {
  return (
    <AppBar
      position="fixed"
      component="header"
      elevation={0}
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        p: 2,
      }}
    >
      <InnerContainer>
        <Toolbar disableGutters>
          <ButtonBase component={InternalLink} to={"/"}
            sx={{color: "inherit", textDecoration: "none"}}>
            <PageAvatar image={avatar} title={title} />
            <Box sx={{ml: 2}}>
              <Typography variant="h4" noWrap={true} sx={{mb: 0.5}}>
                {title}
              </Typography>
              <Typography variant="h6" sx={(theme) => ({
                fontSize: "1rem",
                lineHeight: 1.4,
                [theme.breakpoints.up("sm")]: {
                  display: "block",
                },
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              })}>
                {tagline}
              </Typography>
            </Box>
          </ButtonBase>
        </Toolbar>
      </InnerContainer>
    </AppBar>
  );
};

/**
 * @typedef PageHeaderProps - The page header props.
 * @property {string} title - The title of the site.
 * @property {string} tagline - The tagline for the site.
 * @property {GatsbyImageData} avatar - The gatsby image data for the site avatar.
 */
PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  avatar: PropTypes.object.isRequired,
};

export default PageHeader;
