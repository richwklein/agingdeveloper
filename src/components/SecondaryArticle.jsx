import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import InternalLink from "./InternalLink";
import {ArticleDigestProps} from "../props";

/**
 * React component for showing an article as a rectangle card in a
 * {@link SecondaryArticleGrid} component. The image is displayed at the top
 * of the card in a HD Video 16x9.
 *
 * @param {SecondaryArticleProps} props - The secondary article props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 *  <SecondaryArticle article={article} />
 */
const SecondaryArticle = ({article: {title, excerpt, published, slug, image}}) => {
  return (
    <Card variant="outlined">
      <CardActionArea component={InternalLink} to={`/article/${slug}`} sx={{minHeight: 452}}>
        <CardMedia>
          <GatsbyImage image={image} />
        </CardMedia>
        <CardHeader titleTypographyProps={{"variant": "h6"}}
          title={title}
          subheader={published}
          sx={{pb: 1, pt: 1.5}} />
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

export default SecondaryArticle;
