import React from "react";
import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import moment from "moment";
import PropTypes from "prop-types";
import {ArticleDigestProps} from "../props";
import InternalLink from "./InternalLink";


/**
 * React component for showing an article as a rectangle card in a
 * {@link SecondaryArticleGrid} component. The image is displayed at the top
 * of the card in a HD Video 16x9.
 *
 * @param {SecondaryArticleProps} props - The secondary article props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <SecondaryArticle article={article} />
 */
export const SecondaryArticle = ({article: {title, excerpt, published, slug, image}}) => {
  return (
    <Card variant="outlined">
      <CardActionArea component={InternalLink} to={`/article/${slug}`} sx={{minHeight: 452}}>
        <CardMedia>
          <GatsbyImage image={image} alt={title} />
        </CardMedia>
        <CardHeader titleTypographyProps={{"variant": "h6"}}
          title={title}
          subheader={moment(published).format("MMMM DD, YYYY")}
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
      </CardActionArea>
    </Card>
  );
};

/**
 * @typedef SecondaryArticleProps - A secondary article card props.
 * @property {ArticleDigestProps} article - The article to display.
 */
SecondaryArticle.propTypes = {
  article: ArticleDigestProps.isRequired,
};

/**
 * React component for showing a grid of {@link SecondaryArticle} components.
 *
 * @param {SecondaryArticleGridProps} props - The secondary article grid props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 *  <SecondaryArticleGrid articles={articles} />
 */
export const SecondaryArticleGrid = ({articles}) => {
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
