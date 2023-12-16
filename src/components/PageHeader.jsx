import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import {AppBar, Avatar, ButtonBase, Stack, Typography} from "@mui/material";
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
 * <PageAvatar image={image} />
 *
 * @ignore
 */
const PageAvatar = ({image}) => {
  return (<Avatar
    variant="rounded"
    sx={{
      bgcolor: "primary.dark",
      borderWidth: 1,
      borderColor: "secondary.light",
      borderStyle: "solid",
      width: "72px",
      height: "72px",
    }}>
    <GatsbyImage image={image} sx={{backgroundColor: "inherit"}} />
  </Avatar>);
};

/**
 * @typedef PageAvatarProps - The page avatr props.
 * @property {GatsbyImageData} image - The gatsby image data for the site avatar.
 *
 * @ignore
 */
PageAvatar.propTypes = {
  image: PropTypes.object.isRequired,
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
const PageHeader = ({title, tagline, avatar}) => {
  return (
    <AppBar
      position="sticky"
      component="header"
      elevation={0}
      sx={{
        color: "primary.contrastText",
        bgcolor: "primary.dark",
        p: 2,
        mb: 4,
      }}
    >
      <InnerContainer>
        <ButtonBase component={InternalLink} to={"/"}
          sx={{color: "primary.contrastText", textDecoration: "none"}}>
          <PageAvatar image={avatar} />
          <Stack direction="column"
            flexShrink={1}
            useFlexGap
            alignItems="flex-start"
            sx={{ml: 3}}>
            <Typography variant="h4" sx={{mb: 0.5}}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{fontSize: "1rem", lineHeight: 1.4}}>
              {tagline}
            </Typography>
          </Stack>
        </ButtonBase>
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
