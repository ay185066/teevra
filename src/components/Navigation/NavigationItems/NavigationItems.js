import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import { BrowserRouter } from "react-router-dom";

const NavigationItems = () => {
  return (
    <BrowserRouter>
      <ul className="navigation-items">
        <NavigationItem link="/" exact>
          Home
        </NavigationItem>
        <NavigationItem link="/batch" exact>
          Batch
        </NavigationItem>
        <NavigationItem link="/help" exact>
          Help
        </NavigationItem>
      </ul>
    </BrowserRouter>
  );
};

export default NavigationItems;
