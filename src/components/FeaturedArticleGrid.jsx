import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import {ArticleDigestProps} from "../props";
import FeaturedArticle from "./FeaturedArticle";

/**
 * React component for showing a grid of {@link FeaturedArticle} components.
 *
 * @param {FeaturedArticleGridProps} props - The featured article grid props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 *  <FeaturedArticleGrid articles={articles} />
 */
const FeaturedArticleGrid = ({articles}) => {
  return (
    <Grid container rowSpacing={4} columnSpacing={3} sx={{mt: 0}}>
      {articles.map((article) => (
        <Grid item key={article.slug} sm={12} md={6}>
          <FeaturedArticle article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

/**
 * @typedef FeaturedArticleGridProps - A grid of featured articles props.
 * @property {ArticleDigestProps[]} articles - The list of articles to display.
 */
FeaturedArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(ArticleDigestProps).isRequired,
};

export default FeaturedArticleGrid;
