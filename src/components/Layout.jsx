import * as React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";
import PageHeader from "./PageHeader";
import theme from "../styles/theme";
import PageFooter from "./PageFooter";
import InnerContainer from "./InnerContainer";

function Layout({children, props}) {
  return (
    <ThemeProvider {...props} theme={theme}>
      <CssBaseline />
      <PageHeader
        title="The Aging Developer"
        tagline="for growing old in the software development community"
      />
      <InnerContainer flexGrow={1}>{children}</InnerContainer>
      <PageFooter title="The Aging Developer" repository="https://github.com/richwklein/agingdeveloper" />
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  props: PropTypes.any,
};

export default Layout;
