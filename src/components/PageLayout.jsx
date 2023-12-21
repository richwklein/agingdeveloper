import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {useSiteData} from "../hooks/useSiteData";
import {ChildrenProps} from "../props";
import theme from "../styles/theme";
import InnerContainer from "./InnerContainer";
import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader";
import "prismjs/themes/prism-tomorrow.css";
import "../styles/layout.css";

/**
 * React component used to render the overall layout of all pages.
 *
 * @param {PageLayoutProps} props - The page layout props.
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <PageLayout>
 *   <TagBreadcrumb name={category} isCategory={true} />
 *   <TagGrid tags={group} />
 * </PageLayout>
 */
export const PageLayout = ({children}) => {
  const {title, tagline, image, repository} = useSiteData();
  const avatar = image.childImageSharp.gatsbyImageData;
  return (
    <ThemeProvider theme={theme}>
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

/**
 * @typedef PageLayoutProps - The page layout props.
 * @property {ChildrenProps} children - The children of the component.
 */
PageLayout.propTypes = {
  children: ChildrenProps,
};

export default PageLayout;
