import React from "react";
import SiteLogo from "../components/siteLogo";
import Titlebar from "../components/titlebar";
import SiteNavigation from "../components/siteNavigation";

const SiteLayout = ({ title, children }) => {
  return (
    <div id="site-wrapper">
      <div id="sidebar-wrapper">
        <SiteLogo />
        <SiteNavigation />
      </div>
      <div id="content-wrapper">
        <Titlebar title={title} />
        {children}
      </div>
    </div>
  );
};

export default SiteLayout;
