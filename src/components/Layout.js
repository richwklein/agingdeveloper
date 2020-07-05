import React, { useState, Fragment } from "react";
import Appbar from "./Appbar";
import Drawer from "./Drawer";

export default ({ elevateAppBar = true, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Fragment>
      <Appbar
        onToggleDrawer={handleToggleDrawer}
        elevation={Number(elevateAppBar)}
      />
      {children}
      <Drawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </Fragment>
  );
};
