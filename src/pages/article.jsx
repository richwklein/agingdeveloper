import React from "react";
import {Typography} from "@mui/material";
import PageSEO from "../components/PageSEO";

// TODO everything
const PageArticle = () => {
  return (
    <Typography variant="h1">
      Articles
    </Typography>
  );
};

export const Head = () => {
  return (<PageSEO title={"Articles"} />);
};

export default PageArticle;


