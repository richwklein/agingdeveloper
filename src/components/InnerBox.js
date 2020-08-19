import React from "react";
import {Box} from "@material-ui/core";

const InnerBox = (props) => {
  return (
    <Box marginX="auto" width="100%" maxWidth={1280} {...props}>
      {props.children}
    </Box>
  );
};

export default InnerBox;
