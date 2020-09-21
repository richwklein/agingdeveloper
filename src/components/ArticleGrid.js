import React from "react";
import {Grid} from "@material-ui/core";
import ArticleCard from "./ArticleCard";

const ArticleGrid = ({articles}) => {
  return (
    <Grid container spacing={4}>
      {articles.map(
          ({
            node: {
              excerpt,
              frontmatter: {image, title, date, slug},
            },
          }) => {
            return (
              <Grid item sm={12} md={6} key={slug}>
                <ArticleCard
                  image={image}
                  title={title}
                  date={date}
                  excerpt={excerpt}
                  slug={slug}
                />
              </Grid>
            );
          },
      )}
    </Grid>
  );
};

export default ArticleGrid;
