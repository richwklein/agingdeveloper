import React from "react";
import {Box, Typography} from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import {ArticleAuthorDigestProps} from "../props";
import InternalLink from "./InternalLink";

/**
 * React component for rendering an article's by-line.
 *
 * @param {ArticleByLineProps} props - The article by-line props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ArticleByLine author={author} published={published} />
 */
export const ArticleByLine = ({author, published}) => {
  const formatted = moment.utc(published).format("MMMM DD, YYYY");

  return (
    <Box>
      <InternalLink to={`/author/${author.slug}`} variant="subtitle1"
        sx={{display: "inline-block", p: .5, mr: 1}}>
        {author.name}
      </InternalLink>
      <Typography variant="subtitle2" sx={{display: "inline-block", p: .5}}>
        {formatted}
      </Typography>
    </Box>
  );
};

/**
 * @typedef ArticleByLineProps - Article by-line props
 * @property {ArticleAuthorDigestProps} author - The author of the article.
 * @property {string} published - The date the article was published.
 */
ArticleByLine.propTypes = {
  author: ArticleAuthorDigestProps.isRequired,
  published: PropTypes.string.isRequired,
};

export default ArticleByLine;
