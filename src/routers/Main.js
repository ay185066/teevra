import { React } from "react";
import { Route, Switch } from "react-router-dom";

import BatchListPage from "../components/Batch/BatchListPage";
import Error from "../components/Error/Error";
import Help from "../components/Help/Help";
import Home from "../components/Home/Home";

const Main = () => {
  return (
    <div className="main">
      <div className="component-parent">
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/batch" exact component={BatchListPage} />
          <Route path="/help" exact component={Help} />
          <Route path="/" exact component={BatchListPage} />
          <Route component={Error} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;

// import React from "react";
// import { Route, Switch } from "react-router";

// import Batch from "../components/Batch/Batch";
// import Error from "../components/Error/Error";
// import Help from "../components/Help/Help";
// import Home from "../components/Home/Home";

// const Main = () => {
//   return (
//     <div className="main">
//       <div className="component-parent">
//         <Switch>
//           <Route path="/batch" exact component={Batch} />
//           <Route path="/help" exact component={Help} />
//           <Route path="/" exact component={Home} />
//           <Route component={Error} />
//         </Switch>
//       </div>
//     </div>
//   );
// };

// export default Main;
