import React from "react";
import {Box, Typography} from "@mui/material";
import InternalLink from "./InternalLink";
import {ArticleAuthorDigestProps} from "../props";
import PropTypes from "prop-types";

/**
 * React component for rendering an article's by-line.
 *
 * @param {ArticleByLineProps} props - The article by-line props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ArticleByLine author={author} published={published} />
 */
const ArticleByLine = ({author, published}) => {
  return (
    <Box>
      <InternalLink to={`/author/${author.slug}`} variant="subtitle1"
        sx={{display: "inline-block", p: .5, mr: 1}}>
        {author.name}
      </InternalLink>
      <Typography variant="subtitle2" sx={{display: "inline-block", p: .5}}>
        {published}
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
