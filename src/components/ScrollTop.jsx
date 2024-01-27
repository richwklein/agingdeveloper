import React from "react";
import {KeyboardArrowUpOutlined} from "@mui/icons-material";
import {Box, Fab, useScrollTrigger, Zoom} from "@mui/material";

export const ScrollTop = () => {
  const hasScroll = useScrollTrigger({threshold: 100});

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument).querySelector(
        "#scroll-top",
    );

    if (anchor) {
      anchor.scrollIntoView({behavior: "smooth", block: "center"});
    }
  };

  return (
    <Zoom in={hasScroll}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={(theme) => ({
          position: "fixed",
          bottom: theme.spacing(3.5),
          right: theme.spacing(3.5),
        })}>
        <Fab size="small" color="secondary" aria-label="scroll back to top">
          <KeyboardArrowUpOutlined />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default ScrollTop;
