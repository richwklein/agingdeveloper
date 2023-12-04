import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import ExternalLink from "../common/ExternalLink";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";

const FeaturedImage = ({authorName, authorUrl, siteName, siteUrl, image}) => {
  return (
    <Box component="figure"
      sx={{
        marginTop: 1.25,
        marginBottom: 1.25,
        marginLeft: 0,
        marginRight: 0,
      }}>
      <GatsbyImage image={image} />
      <Typography variant="caption" component="figcaption"
        sx={{
          marginTop: .25,
        }}>
        {"Image by "}
        <ExternalLink to={authorUrl}>{authorName}</ExternalLink>
        {" on "}
        <ExternalLink to={siteUrl}>{siteName}</ExternalLink>
      </Typography>
    </Box>

  );
};

FeaturedImage.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
};
export default FeaturedImage;
