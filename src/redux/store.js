import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { app, user } from "./reducers";

export const rootReducer = combineReducers({ app, user });

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
