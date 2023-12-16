import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import ExternalLink from "./ExternalLink";
import {Box, Typography} from "@mui/material";
import {ImageAuthorProps, ImageSiteProps} from "../props";
import PropTypes from "prop-types";

/**
 * React component for rendering an article's featured image.
 * The image should be in a Cinemascope 21:9 ratio.
 *
 * @param {ArticleImageProps} props - The article's featured image props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ArticleImage
 *   author={featured.author}
 *   site={featured.site}
 *   image={featured.image.childImageSharp.gatsbyImageData} />

 * @todo handle missing author, site, author.url, or site.url
 */
const ArticleImage = ({author, site, image}) => {
  return (
    <Box component="figure"
      sx={{
        my: 1.25,
        mx: 0,
      }}>
      <GatsbyImage image={image} />
      <Typography variant="caption" component="figcaption" sx={{mt: .25}}>
        {"Image by "}
        <ExternalLink to={author.url}>{author.name}</ExternalLink>
        {" on "}
        <ExternalLink to={site.url}>{site.name}</ExternalLink>
      </Typography>
    </Box>

  );
};

/**
 * @typedef ArticleImageProps - The article's featured image props.
 * @property {GatsbyImageData} image - The GatsbyImageData of the image.
 * @property {ImageAuthorProps} [author] - The author of the image.
 * @property {ImageSiteProps} [site] - The site the image comes from.
 */
ArticleImage.propTypes = {
  image: PropTypes.object.isRequired,
  author: ImageAuthorProps,
  site: ImageSiteProps,
};
export default ArticleImage;
