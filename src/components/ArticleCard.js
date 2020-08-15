import React from "react";
import Img from "gatsby-image";
import {Link} from "gatsby";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import {Launch} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  card: {
    "maxWidth": 625,

    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "none",
    },
  },
  cardImage: {
    maxWidth: 610,
    maxHeight: 343,
  },
}));

const ArticleCard = ({image, title, date, excerpt, slug}) => {
  const classes = useStyles();
  const url = "/article/" + slug;

  return (
    <Card variant="outlined" className={classes.card}>
      <CardMedia>
        <Link to={url}>
          <Img
            fluid={image.childImageSharp.fluid}
            className={classes.cardImage}
          />
        </Link>
      </CardMedia>
      <Link to={url}>
        <CardHeader title={title} subheader={date} />
      </Link>
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
};

export default ArticleCard;
