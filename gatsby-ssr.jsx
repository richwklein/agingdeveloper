import React from "react";
import Layout from "./src/components/Layout";
import "prismjs/themes/prism-tomorrow.css";

export const wrapPageElement = ({element, props}) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <Layout {...props}>{element}</Layout>
);
