import React from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  alpha,
} from "@mui/material";
import InternalLink from "./InternalLink";
import {ArticleDigestProps} from "../props";

/**
 * React component for rendering a featured image as a hero image.
 * The image should be in the Cinemascope 21:9 ratio.
 *
 * @param {HeroArticleProps} props - The hero article props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <HeroArticle article={article} />
 */
const HeroArticle = ({article: {title, slug, excerpt, image}}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
      }}
    >
      <CardActionArea disableRipple component={InternalLink} to={`/article/${slug}`}>
        <CardMedia>
          <GatsbyImage image={image} />
        </CardMedia>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: alpha(theme.palette.primary.main, 0.5),
            color: "primary.contrastText",
            backdropFilter: "blur(2px)",
            overflowY: {xs: "scroll", sm: "hidden"},
          })}
        >
          <Grid container>
            <Grid item lg={6} md={8} sm={12} xs={12}>
              <Box
                sx={{
                  p: {xs: 1, md: 4},
                  pr: {md: 0},
                }}
              >
                <CardHeader titleTypographyProps={{"variant": "h3", "color": "inherit"}} title={title} />
                <CardContent>
                  <Typography variant="h5" color="inherit" paragraph>
                    {excerpt}
                  </Typography>
                  <Typography variant="subtitle1" color="inherit">
                    {"Continue Reading"}&hellip;
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  );
};

/**
 * @typedef HeroArticleProps - A hero article props.
 * @property {ArticleDigestProps} article - The article to display.
 */
HeroArticle.propTypes = {
  article: ArticleDigestProps.isRequired,
};

export default HeroArticle;
