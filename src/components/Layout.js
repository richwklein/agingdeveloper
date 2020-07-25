import React, { Fragment, useState } from "react";
import { Link } from "gatsby";
import { CssBaseline, Fab, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowUp } from "@material-ui/icons";
import { useHasScroll } from "has-scroll-hook";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import NavDrawer from "./NavDrawer";
import "../styles/layout.css";

const useStyles = makeStyles((theme) => ({
  topButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ScrollTop = ({ hasScroll }) => {
  const classes = useStyles();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#scroll-top"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={hasScroll}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.topButton}
      >
        <Fab size="small" color="primary" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ({ showLogoImage = true, children }) => {
  const hasScroll = useHasScroll();
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
      <Link id="scroll-top" to="/" />
      {children}
      <BottomBar />
      <ScrollTop hasScroll={hasScroll} />
      <NavDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
    </Fragment>
  );
};
