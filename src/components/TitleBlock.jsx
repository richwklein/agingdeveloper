import React from "react";
import {Avatar, Box, Stack, Toolbar, Typography} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import PropTypes from "prop-types";
import {ChildrenProps} from "../props";

/**
 * React component used to render the author avatar.
 *
 * @param {TitleAvatar} props - The author avatar props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <PageAvatar image={image} alt={alt} />
 */
const TitleAvatar = ({image, alt}) => {
  return (<Avatar
    variant="rounded"
    sx={{
      mr: 2,
      bgcolor: "primary.dark",
      borderWidth: 1,
      borderColor: "secondary.light",
      borderStyle: "solid",
      width: 150,
      height: 200,
    }}>
    <GatsbyImage image={image} sx={{backgroundColor: "inherit"}} alt={alt} />
  </Avatar>);
};

/**
 * @typedef PageAvatarProps - The title avatar props.
 * @property {GatsbyImageData} image - The gatsby image data for the avatar.
 * @property {string} alt - The alt of the avatar.
 */
TitleAvatar.propTypes = {
  image: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
};

/**
 * React component for rendering the title and subtitle of an article.
 *
 * @param {TitleBlockProps} props - The title and subtitle props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <TitleBlock title={title} subtitle={description } />
 */
export const TitleBlock = ({title, subtitle, image, children}) => {
  return (
    <Toolbar disableGutters component="header" sx={{mt: 1}}>
      {image && <TitleAvatar image={image} alt={title} />}
      <Stack direction="column"
        flexShrink={1}
        useFlexGap
        alignItems="flex-start">
        <Typography variant="h3">{title}</Typography>
        {subtitle &&
        <Typography variant="subtitle" component={Box}>
          {subtitle}
        </Typography>
        }
        {children}
      </Stack>
    </Toolbar>
  );
};

/**
 * @typedef TitleBlockProps - The title block props.
 * @property {string} title - The title of the page.
 * @property {string} [subtitle] - The subtitle of the page.
 * @property {Object} [image] - The avatar image for the page.
 * @property {ChildrenProps} [children] - The children of the title.
 */
TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.object,
  children: ChildrenProps,
};

export default TitleBlock;
