import React from "react";
import {Typography} from "@mui/material";
import PageSEO from "../components/PageSEO";

// TODO everything
const PageAuthor = () => {
  return (
    <Typography variant="h1">
      Authors
    </Typography>
  );
};


export const Head = () => {
  return (<PageSEO title={"Authors"} />);
};

export default PageAuthor;


