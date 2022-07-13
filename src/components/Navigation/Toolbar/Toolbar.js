import { React } from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
const Toolbar = (props) => {
  const navigationItems = [
    // {link: '/login', text: 'Login', iconClassName: 'gg-lock-unlock', exact: true},
    {
      link: "/logout",
      text: "Logout",
      iconClassName: "gg-lock-unlock",
      exact: true,
    },
  ];

  return (
    <header className="toolbar">
      <div className="toolbar__first"></div>
      <div>
        <nav className="toolbar__nav">
          <NavigationItems
            navigationItems={navigationItems}
            className="navigation-items"
            activeClassName="toolbar-active-link"
          />
        </nav>
      </div>
    </header>
  );
};

export default Toolbar;
