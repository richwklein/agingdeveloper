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

const useStyles = makeStyles((theme) => ({
  card: {
    "maxWidth": 611,
    "height": 564,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 881,
      height: 734,
    },

    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "none",
    },
  },

  cardImage: {
    maxWidth: 611,
    height: 343,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 881,
      height: 518,
    },
  },

  cardActions: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    position: "sticky",
    bottom: 0,
    left: 0,
  },

}));

const ArticleCard = ({image, title, date, excerpt, slug}) => {
  const classes = useStyles();
  const url = "/article/" + slug;

  return (
    <Card classes={{root: classes.card}} variant="outlined">
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
      <CardActions classes={{root: classes.cardActions}} >
        <IconButton aria-label="read" component={Link} to={url}>
          <Launch />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
