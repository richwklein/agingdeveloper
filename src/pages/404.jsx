import React from "react";
import {Typography} from "@mui/material";
import PageSEO from "../components/PageSEO";

// TODO everything
const Page404 = () => {
  return (
    <Typography variant="h1">
      Not Found (404)
    </Typography>
  );
};

export const Head = () => {
  return (<PageSEO title={"Not Found (404)"} />);
};

export default Page404;


