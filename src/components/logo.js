import React from "react";
import Meta from "../meta";
import image from "../images/logo-399x275.jpg";

const Logo = () => {
  const { title } = Meta();
  return (
    <a href="/" title={title} class="site-logo">
      <img src={image} alt={title} width="399" height="275" />
    </a>
  );
};

export default Logo;
