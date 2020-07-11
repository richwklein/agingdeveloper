import React from "react";
import Layout from "../components/Layout";
import { useHasScroll } from "has-scroll-hook";

export default () => {
  const hasScroll = useHasScroll();

  return <Layout elevateAppBar={hasScroll} showLogoImage={true}></Layout>;
};
