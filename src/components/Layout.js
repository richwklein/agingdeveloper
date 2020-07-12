import React, { Fragment, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import NavDrawer from "./NavDrawer";
import "../styles/layout.css";

export default ({ elevateAppBar = true, showLogoImage = true, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Fragment>
      <CssBaseline />
      <TopBar
        onToggleDrawer={handleToggleDrawer}
        elevation={Number(elevateAppBar)}
        showLogoImage={showLogoImage}
      />
      {children}
      <BottomBar />
      <NavDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </Fragment>
  );
};
