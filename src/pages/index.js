import React from "react";
import Layout from "../components/Layout";
import { Box } from "@material-ui/core";
import { useHasScroll } from "has-scroll-hook";

export default () => {
  const hasScroll = useHasScroll();

  return (
    <Layout elevateAppBar={hasScroll} showLogoImage={false}>
      <Box display="flex" flexDirection="column">
        <Box flexGrow={1} marginX="auto" width="100%" maxWidth={1280}></Box>
      </Box>
    </Layout>
  );
};
