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

const ArticleCard = ({ image, title, date, excerpt, url }) => {
  return (
    <Card variant="outlined">
      <CardMedia>
        <Link to={url}>
          <Img fluid={image.childImageSharp.fluid} />
        </Link>
      </CardMedia>
      <CardHeader title={title} subheader={date} />
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
