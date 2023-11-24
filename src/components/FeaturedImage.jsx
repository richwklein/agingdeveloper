import React from "react";
import ExternalLink from "./ExternalLink";
import {GatsbyImage} from "gatsby-plugin-image";

const FeaturedImage = ({image, repository}) => {
  return (
    <GatsbyImage image={image} />
  );
};

export default FeaturedImage;
