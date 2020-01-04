import React from "react";
import { Link } from "gatsby";

const sidebarNavigation = () => {
  return (
    <nav id="sidebar-nav">
      <NavigationItem path="/" name="Home" />
    </nav>
  );
};

const NavigationItem = ({ path, name }) => {
  return (
    <Link to={path} className="sidebar-nav-item" activeClassName="active">
      {name}
    </Link>
  );
};

export default sidebarNavigation;
