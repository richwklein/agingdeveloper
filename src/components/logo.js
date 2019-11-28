import React from "react";
import Meta from "../meta";
import image from "../images/logo-399x275.jpg";

const Logo = () => {
  const { siteTitle } = Meta();
  return (
    <a href="/" title={siteTitle} class="site-logo">
      <img src={image} alt={siteTitle} width="399" height="275" />
    </a>
  );
};

export default Logo;
