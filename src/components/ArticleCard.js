import React from "react";
import Img from "gatsby-image";
import {Link} from "gatsby";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import NewBadge from "./NewBadge";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  cardAction: {
    "maxWidth": 598,
    "minHeight": 492,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 880,
      height: "auto",
    },
  },
  cardHeader: {
    paddingBottom: theme.spacing(1),
  },
  cardContent: {
    paddingTop: theme.spacing(1),
  },
  cardImage: {
    maxWidth: 598,
    maxHeight: 336,
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
      <Card variant="outlined">
        <CardActionArea component={Link} to={url}
          className={classes.cardAction}>
          <CardMedia>
            <Img
              fluid={image.childImageSharp.fluid}
              className={classes.cardImage}
            />
          </CardMedia>
          <CardHeader title={title}
            subheader={moment(date).format("MMMM Do, YYYY")}
            className={classes.cardHeader} />
          <CardContent className={classes.cardContent}>
            <Typography variant="body1" color="textSecondary">
              {excerpt}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NewBadge>
  );
};

export default ArticleCard;
