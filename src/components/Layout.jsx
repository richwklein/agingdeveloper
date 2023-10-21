import * as React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
import theme from "../styles/theme";

const Layout = ({children, props}) => {
  return (
    <ThemeProvider {...props} theme={theme}>
      <CssBaseline />
      <TopBar
        title="The Aging Developer"
        tagline="for growing old in the software development community" />
      {children}
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  props: PropTypes.any,
};

export default Layout;
