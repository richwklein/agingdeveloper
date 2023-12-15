import React from "react";
import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import {ArticleDigestType} from "../types";
import FeaturedArticle from "./FeaturedArticle";


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

FeaturedArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(ArticleDigestType).isRequired,
};

export default FeaturedArticleGrid;
