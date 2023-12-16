import React from "react";
import {Grid} from "@mui/material";
import SecondaryArticle from "../components/SecondaryArticle";
import PropTypes from "prop-types";
import {ArticleDigestProps} from "../props";

/**
 * React component for showing a grid of {@link SecondaryArticle} components.
 *
 * @param {SecondaryArticleGridProps} props - The secondary article grid props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 *  <SecondaryArticleGrid articles={articles} />
 */
const SecondaryArticleGrid = ({articles}) => {
  return (
    <Grid container rowSpacing={4} columnSpacing={3} sx={{mt: 0, mb: 4}}>
      {articles.map((article) => (
        <Grid item key={article.slug} xs={12} sm={6} md={4}>
          <SecondaryArticle article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

/**
 * @typedef SecondaryArticleGridProps - A grid of secondary articles props.
 * @property {ArticleDigestProps[]} articles - The list of articles to display.
 */
SecondaryArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(ArticleDigestProps).isRequired,
};

export default SecondaryArticleGrid;
