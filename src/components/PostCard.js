import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";

import { LaunchIcon, ShareIcon } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
}));

export default React.memo(function PostCard({
  featuredImage,
  title,
  postDate,
  excerpt,
  url,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
        subheader={postDate}
        className={classes.header}
      />
      <CardMedia>
        <Img fluid={featuredImage.childImageSharp.fluid} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="read" component={Link} to={url}>
          <LaunchIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
});
