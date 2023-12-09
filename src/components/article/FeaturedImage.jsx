import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import ExternalLink from "../ExternalLink";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const FeaturedImage = ({author, site, image}) => {
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

FeaturedImage.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  site: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.any,
};
export default FeaturedImage;
