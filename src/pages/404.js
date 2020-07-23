import React from "react";
import { Box } from "@material-ui/core";
import Layout from "../components/Layout";

export default () => {

  return (
    <Layout showLogoImage={true}>
      <Box flexGrow={1} marginX="auto" width="100%" maxWidth={1280}></Box>
    </Layout>
  );
};
