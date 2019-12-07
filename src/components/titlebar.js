import React from "react";

const Titlebar = ({ heading }) => {
  return (
    <header className="title-bar">
      <h1>{heading}</h1>
    </header>
  );
};

export default Titlebar;
