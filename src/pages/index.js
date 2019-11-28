import React from "react";
import Meta from "../meta";
import Logo from "../components/logo";
import Titlebar from "../components/titlebar";

const Index = () => {
  const { siteTitle } = Meta();
  return (
    <div id="site-wrapper">
      <div id="sidebar-wrapper">
        <Logo />
      </div>
      <div id="content-wrapper">
        <Titlebar heading={siteTitle} />
        <p>What a world.</p>
      </div>
    </div>
  );
};

export default Index;
