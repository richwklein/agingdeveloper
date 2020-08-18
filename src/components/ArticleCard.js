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
import NewBadge from "./NewBadge";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    "maxWidth": 608,
    "height": 565,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 880,
      height: "auto",
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
    maxWidth: 608,
    maxHeight: 342,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 880,
      maxHeight: 495,
    },
  },

}));

const ArticleCard = ({image, title, date, excerpt, slug}) => {
  const classes = useStyles();
  const url = "/article/" + slug;

  return (
    <NewBadge fromDate={date}>
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
          <CardHeader title={title}
            subheader={moment(date).format("MMMM Do, YYYY")} />
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
    </NewBadge>
  );
};

export default ArticleCard;
