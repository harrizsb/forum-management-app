import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";

import store from "./redux/store";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Container maxWidth="xl" disableGutters={true}>
      <App />
    </Container>
  </Provider>,
  document.getElementById("root")
);
