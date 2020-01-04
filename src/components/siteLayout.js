import React from "react";
import SidebarLogo from "./sidebarLogo";
import ContentTitle from "./contentTitle";
import SidebarNavigation from "./sidebarNavigation";

const SiteLayout = ({ title, children }) => {
  return (
    <div id="site-wrapper">
      <div id="sidebar-wrapper">
        <SidebarLogo />
        <SidebarNavigation />
      </div>
      <div id="content-wrapper">
        <ContentTitle title={title} />
        {children}
      </div>
    </div>
  );
};

export default SiteLayout;
