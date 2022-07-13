import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import { batchReducer } from "./reducers/index";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;
// logger
// const logger = (store) => {
//   return (next) => {
//     return (action) => {
//       console.log("[Middleware] Dispatching", action.type);
//       const result = next(action);
//       return result;
//     };
//   };
// };

// combiner reducers
const rootReducer = combineReducers({
  batches: batchReducer,
});

// store creation
const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;
