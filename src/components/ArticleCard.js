import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";

import { Launch } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 320,
  },
}));

export default React.memo(function ArticleCard({
  image,
  title,
  date,
  excerpt,
  url,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={title} subheader={date} className={classes.header} />
      <CardMedia>
        <Img fluid={image.childImageSharp.fluid} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="read" component={Link} to={url}>
          <Launch />
        </IconButton>
      </CardActions>
    </Card>
  );
});
