import React from "react";
import Meta from "../meta";
import SiteLogo from "../components/siteLogo";
import Titlebar from "../components/titlebar";
import SiteNavigation from "../components/siteNavigation";

const Index = () => {
  const { siteTitle } = Meta();
  return (
    <div id="site-wrapper">
      <div id="sidebar-wrapper">
        <SiteLogo />
        <SiteNavigation />
      </div>
      <div id="content-wrapper">
        <Titlebar heading={siteTitle} />
        <p>What a world.</p>
      </div>
    </div>
  );
};

export default Index;
