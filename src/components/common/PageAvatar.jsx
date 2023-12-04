import React from "react";
import {useStaticQuery, graphql} from "gatsby";
import {GatsbyImage} from "gatsby-plugin-image";
import {Avatar} from "@mui/material";

const PageAvatar = () => {
  const data = useStaticQuery(graphql`
  query AvatarQuery {
    siteYaml(slug: {eq: "agingdeveloper"}) {
      image {
        childImageSharp {
          gatsbyImageData(
            width: 72
            height: 72
            placeholder: DOMINANT_COLOR
            layout: FIXED
          )
        }
      }
    }
  }
`);

  return (
    <Avatar
      variant="rounded"
      sx={{
        borderWidth: 1,
        borderColor: "secondary.light",
        borderStyle: "solid",
        width: "72px",
        height: "72px",
      }}>
      <GatsbyImage image={data.siteYaml.image.childImageSharp.gatsbyImageData} />
    </Avatar>
  );
};

export default PageAvatar;
