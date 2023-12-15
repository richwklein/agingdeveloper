import React from "react";
import {Box, Typography} from "@mui/material";
import InternalLink from "./InternalLink";
import {ArticleAuthorDigestType} from "../types";
import PropTypes from "prop-types";

/**
 * React component for rendering an article's by-line.
 *
 * @param {ArticleByLineType} props - The author and published date of the article.
 * @return {React.ReactElement}
 *
 * @example
 * <ArticleByLine author={author} date={date} />
 */
const ArticleByLine = ({author, date}) => {
  return (
    <Box>
      <InternalLink to={`/author/${author.slug}`} variant="subtitle1"
        sx={{display: "inline-block", p: .5, mr: 1}}>
        {author.name}
      </InternalLink>
      <Typography variant="subtitle2" sx={{display: "inline-block", p: .5}}>
        {date}
      </Typography>
    </Box>
  );
};

/**
 * @typedef ArticleByLineType - The article by-line PropTypes.
 * @property {ArticleAuthorDigestType} author - The author of the article.
 * @property {string} date - The date the article was published.
 */
ArticleByLine.propTypes = {
  author: ArticleAuthorDigestType.isRequired,
  date: PropTypes.string.isRequired,
};

export default ArticleByLine;
