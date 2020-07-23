import React from "react";
import { Box } from "@material-ui/core";
import Layout from "../components/Layout";
import { useHasScroll } from "has-scroll-hook";

export default ({ data, pageContext }) => {
  const hasScroll = useHasScroll();

  return (
    <Layout hasScroll={hasScroll} showLogoImage={true}>
      <Box
        padding={2}
        flexGrow={1}
        marginX="auto"
        width="100%"
        maxWidth={1280}
      ></Box>
    </Layout>
  );
};
