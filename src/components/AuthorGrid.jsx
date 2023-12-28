import React from "react";
import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import PropTypes from "prop-types";
import {AuthorDigestProps} from "../props";
import InternalLink from "./InternalLink";

/**
 * React component used to render the author avatar.
 *
 * @param {AuthorAvatarProps} props - The author avatar props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <AuthorAvatar image={image} name={name} />
 */
export const AuthorAvatar = ({image, name}) => {
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
    <GatsbyImage image={image} sx={{backgroundColor: "inherit"}} alt={name} />
  </Avatar>);
};

/**
 * @typedef AuthorAvatarProps - The author avatar props.
 * @property {GatsbyImageData} image - The gatsby image data for the author avatar.
 * @property {string} name - The name of the author.
 */
AuthorAvatar.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

/**
 * React component used to render the author button.
 *
 * @param {AuthorButtonProps} props - The author button props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <AuthorButton author={author} />
 */
export const AuthorButton = ({author}) => {
  return (
    <Button
      variant="contained"
      size="large"
      disableElevation
      component={InternalLink}
      to={`/author/${author.slug}`}
      startIcon={<AuthorAvatar image={author.image} name={author.name} />}
      sx={{textTransform: "none"}}
    >
      <Box sx={{ml: 2}}>
        <Typography variant="body1" sx={{mb: 0.25, fontWeight: "bolder"}}>
          {author.name}
        </Typography>
        <Typography variant="body2">
          {author.tagline}
        </Typography>
      </Box>
    </Button>
  );
};

/**
 * @typedef AuthorButtonProps - The author link props.
 * @property {AuthorDigestProps} author - The author the link  is for.
 */
AuthorButton.propTypes = {
  author: AuthorDigestProps.isRequired,
};

/**
 * React component for showing a grid of author cards.
 *
 * @param {AuthorGridProps} props - The author grid props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 *  <AuthorGrid authors={authors} />
 */
export const AuthorGrid = ({authors}) => {
  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      {authors.map((author) => (
        <Grid item md={4} sm={12} key={author.slug}>
          <AuthorButton author={author} />
        </Grid>
      ))}
    </Grid>
  );
};

/**
 * @typedef AuthorGridProps - A grid of authors props.
 * @property {ArticleDigestProps[]} articles - The list of authors to display.
 */
AuthorGrid.propTypes = {
  authors: PropTypes.arrayOf(AuthorDigestProps).isRequired,
};

export default AuthorGrid;
