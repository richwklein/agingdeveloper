import React from "react";
import PageLayout from "./src/components/PageLayout";

export const wrapPageElement = ({element, props}) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <PageLayout>{element}</PageLayout>
);
