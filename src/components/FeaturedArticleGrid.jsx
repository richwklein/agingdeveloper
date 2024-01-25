import React from "react";
import {Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import moment from "moment";
import PropTypes from "prop-types";
import {ArticleDigestProps} from "../props";
import InternalLink from "./InternalLink";

/**
 * React component for showing an article as a horizontal feature card in a
 * {@link FeaturedArticleGrid} component. The image is displayed in a vertical
 * Standard Monitor 3x4 ratio.
 *
 * @param {FeaturedArticleProps} props - The featured article props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 *  <FeaturedArticle article={article} />
 */
export const FeaturedArticle = ({article: {title, excerpt, published, slug, image}}) => {
  return (
    <Card variant="outlined">
      <CardActionArea component={InternalLink} to={`/article/${slug}`} sx={{display: "flex"}} >
        <Box
          sx={(theme) => ({
            flex: 1,
            maxHeight: 240,
            [theme.breakpoints.up("lg")]: {
              overflowY: "hidden",
            },
            [theme.breakpoints.down("lg")]: {
              overflowY: "scroll",
            },
          })}>
          <CardHeader titleTypographyProps={{"variant": "h6"}}
            title={title}
            subheader={moment.utc(published).format("MMMM DD, YYYY")}
            sx={{pb: 1, pt: 1.5}}
          />
          <CardContent component="p"
            sx={{
              "m": 0,
              "pt": 1,
              "&:last-child": {
                pb: 1.5,
              },
            }}>
            <Typography variant="subtitle1" component="span">
              {excerpt}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          sx={(theme) => ({
            [theme.breakpoints.up("sm")]: {
              display: "block",
            },
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          })}
        >
          <GatsbyImage image={image} alt={title} />
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

/**
 * @typedef FeaturedArticleProps - A featured article props.
 * @property {ArticleDigestProps} article - The article to display.
 */
FeaturedArticle.propTypes = {
  article: ArticleDigestProps.isRequired,
};

/**
 * React component for showing a grid of {@link FeaturedArticle} components.
 *
 * @param {FeaturedArticleGridProps} props - The featured article grid props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 *  <FeaturedArticleGrid articles={articles} />
 */
export const FeaturedArticleGrid = ({articles}) => {
  return (
    <Grid container rowSpacing={4} columnSpacing={3} sx={{mt: 0, mb: 4}}>
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
