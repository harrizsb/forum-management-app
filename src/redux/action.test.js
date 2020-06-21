import { newCaptcha, toggleLoading } from "./action";
import { INIT_NEW_CAPTCHA, TOGGLE_LOADING } from "./actionTypes";

describe("action test", () => {
  it("should create an action for newCaptcha", () => {
    const expectedAction = {
      type: INIT_NEW_CAPTCHA,
    };

    expect(newCaptcha()).toEqual(expectedAction);
  });

  it("should create an action for toggleLoading", () => {
    const expectedAction = {
      type: TOGGLE_LOADING,
    };

    expect(toggleLoading()).toEqual(expectedAction);
  });
});
