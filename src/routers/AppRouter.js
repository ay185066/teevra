import React from "react";
import { BrowserRouter } from "react-router-dom";

import Main from "./Main";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";

const AppRouter = () => (
  <BrowserRouter>
    <div className="wrapper">
      <header className="header">
        <Toolbar />
      </header>

      <div className="middle">
        <div className="container">
          <main className="content">
            <Main />
          </main>
        </div>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;

// import React from "react";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router";
// import { BrowserRouter } from "react-router-dom";

// import BatchListPage from "../components/Batch/BatchListPage";
// import Error from "../components/Error/Error";
// import Help from "../components/Help/Help";
// import Home from "../components/Home/Home";
// import NavigationItems from "../components/Navigation/NavigationItems/NavigationItems";

// const history = createBrowserHistory();

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <div>
//         <NavigationItems />
//       </div>
//       <div className="component-parent">
//         <Switch>
//           <Route path="/batch" exact component={BatchListPage} />
//           <Route path="/help" exact component={Help} />
//           <Route path="/" exact component={Home} />
//           <Route component={Error} />
//         </Switch>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;
