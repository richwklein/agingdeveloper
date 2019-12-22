import React from "react";
import Meta from "../meta";
import SiteLayout from "../components/siteLayout";

const Index = () => {
  const { siteTitle } = Meta();
  return (
    <SiteLayout title={siteTitle}>
      <p>Hello World!</p>
    </SiteLayout>
  );
};

export default Index;
