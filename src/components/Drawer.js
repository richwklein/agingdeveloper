import React from "react";
import { Drawer } from "@material-ui/core";

export default ({ open, onClose }) => {
  return <Drawer open={open} onClose={onClose}></Drawer>;
};
