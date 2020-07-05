import React, { useState, Fragment } from "react";
import Appbar from "../components/Appbar";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";

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
      <Footer />
      <Drawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </Fragment>
  );
};
