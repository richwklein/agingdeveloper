import * as React from "react";
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
import {ArticleDigestType} from "../types";

// TODO proptypes for image
const FeaturedArticle = ({article: {title, excerpt, date, slug, image}}) => {
  // Image ratio is Standard Monitor vertical 3x4
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
            subheader={date}
            sx={{pb: 1, pt: 1.5}} />
          <CardContent component="p"
            sx={{
              "m": 0,
              "pt": 1,
              "&:last-child": {
                pb: 1.5,
              },
            }}>
            <Typography variant="subtitle1">
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

FeaturedArticle.propTypes = {
  article: ArticleDigestType.isRequired,
};

export default FeaturedArticle;
