import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import Tag from "./Tag";

/**
 * React component for showing an article's category and tags.
 *
 * @param {ArticleTagGridType} props - The category and tags on the article.
 * @return {React.ReactElement}
 *
 * @example
 * <ArticleTagGrid category={category} tags={tags} />
 */
const ArticleTagGrid = ({category, tags}) => {
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
 * @typedef ArticleTagGridType - The article tags PropTypes.
 * @property {string} category - The article's category.
 * @property {arrayOf(string)} tags - The tags on the article.
 */
ArticleTagGrid.propTypes = {
  category: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ArticleTagGrid;
