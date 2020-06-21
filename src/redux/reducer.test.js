import { app, initialStateApp } from "./reducers";
import { INIT_NEW_CAPTCHA, TOGGLE_LOADING } from "./actionTypes";

describe("test reducers", () => {
  it("should return the initial state of app", () => {
    expect(app(undefined, {})).toEqual(initialStateApp);
  });

  it("should return the new captcha state", () => {
    const target = app(undefined, {
      type: INIT_NEW_CAPTCHA,
    });
    expect(target).toHaveProperty("captcha.challenge");
    expect(target).toHaveProperty("captcha.challenge.value");
    expect(target).toHaveProperty("captcha.challenge.numbers");
  });

  it("should return the new loading state from it's initial", () => {
    const target = app(undefined, {
      type: TOGGLE_LOADING,
    });
    expect(target.loading).toBeTruthy();
  });

  it("should toggle the loading", () => {
    const target = app(
      {
        ...initialStateApp,
        loading: true,
      },
      {
        type: TOGGLE_LOADING,
      }
    );
    expect(target.loading).toBeFalsy();
  });
});
