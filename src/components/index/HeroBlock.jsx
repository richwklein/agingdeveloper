import React, {Fragment} from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import {Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import InternalLink from "../common/InternalLink";
import PropTypes from "prop-types";

const HeroBlock = ({hero: {title, slug, excerpt, image}}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <CardActionArea disableRipple component={InternalLink} to={`/article/${slug}`}>
        <CardMedia>
          <GatsbyImage image={image} sx={{zIndex: 1}} />
        </CardMedia>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            backgroundColor: "rgb(55, 71, 79, 0.5)",
            backdropFilter: "blur(4px)",
            overflowY: {xs: "scroll", sm: "hidden"},
          }}
        >
          <Grid container>
            <Grid item md={6} sm={12} xs={12}>
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
                    <Fragment>{"Continue Reading"}&hellip;</Fragment>
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

HeroBlock.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.any,
  }).isRequired,
};

export default HeroBlock;
