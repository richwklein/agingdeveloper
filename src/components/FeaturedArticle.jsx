import React from "react";
import {
  Box,
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
const FeaturedArticle = ({article: {title, excerpt, published, slug, image}}) => {
  return (
    <Card variant="outlined">
      <CardActionArea component={InternalLink} to={`/article/${slug}`} sx={{display: "flex"}} >
        <Box sx={{
          flex: 1,
          maxHeight: 240,
          overflowY: {
            md: "scroll",
            lg: "hidden",
          },
        }}>
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
        </Box>
        <CardMedia sx={{display: {xs: "none", sm: "block"}}}>
          <GatsbyImage image={image} />
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

export default FeaturedArticle;
