import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import NavDrawer from "./NavDrawer";

export default ({ elevateAppBar = true, showLogoImage = true, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Fragment>
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
