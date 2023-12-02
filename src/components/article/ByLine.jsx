import React from "react";
import {Box, Typography} from "@mui/material";
import InternalLink from "../common/InternalLink";
import PropTypes from "prop-types";

const ByLine = ({authorName, authorSlug, publishedDate}) => {
  return (
    <Box>
      <Typography variant="subtitle2"
        sx={{
          display: "inline-block",
          backgroundColor: "primary.dark",
          color: "primary.contrastText",
          marginRight: .25,
        }}>
        <InternalLink to={`/author/${authorSlug}`}
          sx={{
            display: "inline-block",
            backgroundColor: "inherit",
            color: "inherit",
            textDecoration: "underline",
            padding: .75,
          }}>
          {authorName}
        </InternalLink>
      </Typography>
      <Typography variant="subtitle2" sx={{
        display: "inline-block",
        padding: .75,
      }}>
        {publishedDate}
      </Typography>
    </Box>
  );
};

ByLine.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorSlug: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
};

export default ByLine;
