import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./src/styles/theme";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);
