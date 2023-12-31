import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import {Tag} from "./TagGrid";

/**
 * React component for rendering an article's category and tags.
 *
 * @param {ArticleTagGridProps} props - An article tag and category props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ArticleTagGrid category={category} tags={tags} />
 */
export const ArticleTagGrid = ({category, tags}) => {
  return (
    <Grid container spacing={1.5}>
      <Grid item key={category}>
        <Tag name={category} isCategory={true} />
      </Grid>
      {tags.map((tag) => {
        return (
          <Grid item key={tag}>
            <Tag name={tag} />
          </Grid>
        );
      })}
    </Grid>
  );
};

/**
 * @typedef ArticleTagGridProps - An article's tag metadata props.
 * @property {string} category - The article's category.
 * @property {string[]} tags - The tags on the article.
 */
ArticleTagGrid.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ArticleTagGrid;
