import React, { lazy, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./utility/history";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

const Login = lazy(() => import("./views/Login"));
const Register = lazy(() => import("./views/Register"));
const CreateTopic = lazy(() => import("./views/CreateTopic"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const Topic = lazy(() => import("./views/Topic"));
const SearchTopic = lazy(() => import("./views/SearchTopic"));

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <Route path="/login">
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        </Route>
        <Route path="/register">
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        </Route>
        <PrivateRoute path="/">
          <Navbar />
          <Route exact path="/">
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          </Route>

          <Route path="/topic/:id">
            <Suspense fallback={<Loading />}>
              <Topic />
            </Suspense>
          </Route>

          <Route path="/create-topic">
            <Suspense fallback={<Loading />}>
              <CreateTopic />
            </Suspense>
          </Route>

          <Route path="/search-topic">
            <Suspense fallback={<Loading />}>
              <SearchTopic />
            </Suspense>
          </Route>
        </PrivateRoute>
        <Route>
          <span>You are lost</span>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
