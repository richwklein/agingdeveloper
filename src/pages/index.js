import React from "react";
import Layout from "../components/Layout";
import { Box } from "@material-ui/core";
import { useHasScroll } from "has-scroll-hook";

export default () => {
  /* Get the vertical scrollbar offset as a boolean value. */
  const hasScroll = useHasScroll();

  return (
    <Layout elevateAppBar={hasScroll}>
      <Box display="flex" flexDirection="column">
        <Box flexGrow={1} marginX="auto" width="100%" maxWidth={1080}></Box>
      </Box>
    </Layout>
  );
};
