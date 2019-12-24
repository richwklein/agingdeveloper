import React from "react";
import Meta from "../meta";
import SiteLayout from "../components/siteLayout";
import Card from "../components/card";

const Index = () => {
  const { siteTitle } = Meta();
  return (
    <SiteLayout title={siteTitle}>
      <Card>
        <p>Hello World!</p>
      </Card>
    </SiteLayout>
  );
};

export default Index;
