import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";
import PageHeader from "./PageHeader";
import theme from "../styles/theme";
import PageFooter from "./PageFooter";
import {useSiteData} from "../hooks/useSiteData";
import {ChildrenType} from "../types";
import "prismjs/themes/prism-tomorrow.css";
import "../styles/layout.css";
import InnerContainer from "./InnerContainer";

// TODO remove spred
const Layout = ({children, props}) => {
  const {title, tagline, image, repository} = useSiteData();
  const avatar = image.childImageSharp.gatsbyImageData;
  return (
    <ThemeProvider {...props} theme={theme}>
      <CssBaseline />
      <PageHeader
        title={title}
        tagline={tagline}
        avatar={avatar}
      />
      <InnerContainer useMain={true}>
        {children}
      </InnerContainer>
      <PageFooter title={title} repository={repository} />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: ChildrenType,
  props: PropTypes.any,
};

export default Layout;