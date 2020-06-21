import React from "react";
import { createStore } from "redux";
import { render, screen } from "../utility/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Loading from "./Loading";

it("render loading when state is true", () => {
  const store = createStore(() => ({ app: { loading: true } }));
  render(<Loading />, { store });
  const loading = screen.getByTestId("loading");
  expect(loading).toBeInTheDocument();
});
