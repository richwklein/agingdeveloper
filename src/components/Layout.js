import React, { useState, Fragment } from "react";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import Footer from "./Footer";

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
      <Footer></Footer>
      <Drawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </Fragment>
  );
};
