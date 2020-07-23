import React, { Fragment, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import NavDrawer from "./NavDrawer";
import "../styles/layout.css";
import { Link } from "gatsby";

export default ({ hasScroll = false, showLogoImage = true, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Fragment>
      <CssBaseline />
      <TopBar
        onToggleDrawer={handleToggleDrawer}
        hasScroll={hasScroll}
        showLogoImage={showLogoImage}
      />
      <Link id="scroll-top" />
      {children}
      <BottomBar hasScroll={hasScroll} />
      <NavDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </Fragment>
  );
};
