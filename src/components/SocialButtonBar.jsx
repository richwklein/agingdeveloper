import React from "react";
import {Facebook, GitHub, Instagram, LinkedIn, Pinterest, Public, Reddit, Twitter} from "@mui/icons-material";
import {ButtonGroup, IconButton} from "@mui/material";
import PropTypes from "prop-types";
import {SocialProps} from "../props";
import ExternalLink from "./ExternalLink";

/**
 * A react component for rendering a social media icon.
 * If the name is not provided, a default image is used.
 *
 * @param {SocialIconProps} props
 * @return {React.ReactElement} - The react component.
 */
export const SocialIcon = React.memo(({name=null}) => {
  switch (name.toLowerCase()) {
    case "twitter":
      return <Twitter />;
    case "facebook":
      return <Facebook />;
    case "linkedin":
      return <LinkedIn />;
    case "github":
      return <GitHub />;
    case "instagram":
      return <Instagram />;
    case "pinterest":
      return <Pinterest />;
    case "reddit":
      return <Reddit />;
    default:
      return <Public />;
  }
});

SocialIcon.displayName = "SocialIcon";

/**
 * @typedef SocialIconProps - The props for the social icon.
 * @property {string} [name] - The name of the social site.
 */
SocialIcon.propTypes = {
  name: PropTypes.string,
};

/**
 * A react component for rendering a social media buttons.
 *
 * @param {SocialButtonProps} props
 * @return {React.ReactElement} - The react component.
 */
export const SocialButton = ({social: {name, url}}) => {
  return (
    <IconButton
      component={ExternalLink }
      to={url}
      title={name}
      sx={{color: "primary.main"}}>
      <SocialIcon name={name} />
    </IconButton>
  );
};

/**
 * @typedef SocialButtonProps - The social links button props.
 * @property {SocialProp} social - The social metadata.
 */
SocialButton.propTypes = {
  social: SocialProps,
};

/**
 * A react component for rendering a bar of social media buttons.
 *
 * @param {SocialButtonBarProps} props
 * @return {React.ReactElement} - The react component.
 */
export const SocialButtonBar = ({socials}) => {
  return (
    <ButtonGroup>
      {socials.map((social) => {
        return (
          <SocialButton key={social.name} social={social} />
        );
      })};
    </ButtonGroup>);
};

/**
 * @typedef SocialButtonBarProps - The social links button bar props.
 * @property {SocialProps[]} socials - A list of social metadata.
 */
SocialButtonBar.propTypes = {
  socials: PropTypes.arrayOf(SocialProps).isRequired,
};
export default SocialButtonBar;
