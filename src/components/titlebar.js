import React from "react";

const Titlebar = ({ heading }) => {
  return (
    <header class="title-bar">
      <h1>{heading}</h1>
    </header>
  );
};

export default Titlebar;
