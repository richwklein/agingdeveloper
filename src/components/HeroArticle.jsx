import React from "react";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import {GatsbyImage} from "gatsby-plugin-image";
import moment from "moment";
import {ArticleDigestProps} from "../props";
import InternalLink from "./InternalLink";

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
export const HeroArticle = ({article: {title, slug, published, excerpt, image}}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
      }}
    >
      <CardActionArea disableRipple component={InternalLink} to={`/article/${slug}`}>
        <CardMedia>
          <GatsbyImage image={image} alt={title} />
        </CardMedia>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: alpha(theme.palette.primary.main, 0.4),
            color: "primary.contrastText",
            backdropFilter: "blur(4px)",
            [theme.breakpoints.up("md")]: {
              overflowY: "hidden",
            },
            [theme.breakpoints.down("md")]: {
              overflowY: "scroll",
            },
          })}
        >
          <Grid container>
            <Grid item lg={8} sm={12} xs={12}>
              <Box
                sx={{
                  p: {xs: 1, md: 4},
                  pr: {md: 0},
                }}
              >
                <CardHeader
                  titleTypographyProps={{"variant": "h3", "color": "inherit"}}
                  title={title}
                  subheaderTypographyProps={{"color": "inherit"}}
                  subheader={moment(published).format("MMMM DD, YYYY")} />
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
