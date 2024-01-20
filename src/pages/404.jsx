import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import {graphql} from "gatsby";
import ArticleImage from "../components/ArticleImage";
import InternalBackButton from "../components/InternalBackButton";
import PageSEO from "../components/PageSEO";

// TODO everything
const Page404 = ({data: {file}}) => {
  return (
    <>
      <ArticleImage
        author={{
          name: "Lachlan Donald",
          url: "https://unsplash.com/@lox?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        }}
        site={{
          name: "Unsplash",
          url: "https://unsplash.com/photos/green-signage-on-concrete-road-during-day-time-eaTHXNIUsYM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        }}
        image={file.childImageSharp.gatsbyImageData}
      />
      <Box component="header">
        <Typography variant="h3">
          Not Found (404)
        </Typography>
      </Box>
      <Box component="p">
        {"The page you are looking for might have been removed,"}
        <br/>
        {"had it's name changed, or be temporarily unavailable."}
      </Box>
      <InternalBackButton name="Home" path="/" useViewText={false} />
    </>
  );
};

export default Page404;

// eslint-disable-next-line react/prop-types
export const Head = ({data: {file}}) => {
  // eslint-disable-next-line react/prop-types
  return (<PageSEO title={"Not Found (404)"} image={file.publicURL} />);
};

export const pageQuery = graphql`
  query {
    file(relativePath: {eq: "image/lachlan-donald-eaTHXNIUsYM-unsplash.jpg"}) {
      publicURL
      childImageSharp {
        gatsbyImageData(
          width: 1152,
          placeholder: BLURRED
          layout: CONSTRAINED
          aspectRatio: 2.33
        )
      }
    }
  }
`;
