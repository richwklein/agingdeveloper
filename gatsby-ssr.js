import React from "react";
import { Helmet } from "react-helmet";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./src/styles/theme";
import "./src/styles/layout.css";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <Helmet>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Helmet>
    {element}
  </ThemeProvider>
);
