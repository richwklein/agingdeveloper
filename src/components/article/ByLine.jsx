import React from "react";
import {Box, Typography} from "@mui/material";
import InternalLink from "../common/InternalLink";
import PropTypes from "prop-types";

const ByLine = ({author, date}) => {
  return (
    <Box>
      <InternalLink to={`/author/${author.slug}`} variant="subtitle1" sx={{
        display: "inline-block",
        padding: .5,
        marginRight: 1,
      }}>
        {author.name}
      </InternalLink>
      <Typography variant="subtitle2" sx={{
        display: "inline-block",
        padding: .5,
      }}>
        {date}
      </Typography>
    </Box>
  );
};

ByLine.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  date: PropTypes.string.isRequired,
};

export default ByLine;
