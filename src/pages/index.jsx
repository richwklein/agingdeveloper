import React from "react";
import InternalLink from "../components/common/InternalLink";

const IndexPage = () => {
  return (
    <main>
      <h1>Home Page</h1>
      <InternalLink to="/about/">About</InternalLink>
    </main>
  );
};

export default IndexPage;

export const Head = () => {
  return <title>Home Page</title>;
};


