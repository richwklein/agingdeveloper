import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import InternalLink from "../InternalLink";

// TODO proptypes for image
const FeaturedArticle = ({article: {title, excerpt, date, slug, image}}) => {
  return (
    <Grid item key={slug} sm={12} md={6}>
      <Card variant="outlined">
        <CardActionArea component={InternalLink} to={`/article/${slug}`} sx={{display: "flex"}} >
          <Box sx={{
            flex: 1,
            maxHeight: "240px",
            overflowY: {
              sm: "scroll",
              md: "hidden",
            },
          }}>
            <CardHeader titleTypographyProps={{"variant": "h5"}}
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
          <CardMedia>
            <GatsbyImage
              sx={{width: 180, display: {xs: "none", sm: "block"}}}
              image={image} />
          </CardMedia>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

FeaturedArticle.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.any,
  }).isRequired,
};

export default FeaturedArticle;
