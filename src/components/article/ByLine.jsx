import React from "react";
import {Stack, Typography} from "@mui/material";
import InternalLink from "../common/InternalLink";
import PropTypes from "prop-types";
import slug from "slug";

const ByLine = ({author, category, date}) => {
  return (
    <Stack direction="row" spacing={2}
      useFlexGap
      alignItems="center">
      <InternalLink to={`/author/${author.slug}`} variant="subtitle1">
        {author.name}
      </InternalLink>
      <InternalLink to={`/category/${slug(category)}`} variant="subtitle1">
        {category}
      </InternalLink>
      <Typography variant="subtitle2">
        {date}
      </Typography>
    </Stack>
  );
};

ByLine.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ByLine;
