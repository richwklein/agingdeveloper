import React from "react";
import { Link } from "gatsby";

const SiteNavigation = () => {
  return (
    <nav>
      <ol className="site-nav">
        <SiteNavigationItem path="/" name="Home" />
        <SiteNavigationItem path="/about" name="About" />
        <SiteNavigationItem path="/contact" name="Contact" />
      </ol>
    </nav>
  );
};

const SiteNavigationItem = ({ path, name }) => {
  return (
    <li className="site-nav-item">
      <Link to={path} activeClassName="active" partiallyActive={true}>
        {name}
      </Link>
    </li>
  );
};

export default SiteNavigation;
