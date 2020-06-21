import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, InputAdornment } from "@material-ui/core";
import { newCaptcha, challengeCaptcha } from "../redux/action";

export default () => {
  const dispatch = useDispatch();
  const [captchaValue, setCaptchaValue] = useState();
  const [equalCaptcha, setEqualCaptcha] = useState(false);
  const { captcha } = useSelector(
    (state) => ({
      captcha: state.app.captcha,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!captcha) {
      dispatch(newCaptcha());
    }
  }, [captchaValue, equalCaptcha, dispatch, captcha]);

  return captcha ? (
    <TextField
      fullWidth={true}
      variant="outlined"
      label="Captcha"
      type="text"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {captcha.challenge.numbers.join(" + ")} =
          </InputAdornment>
        ),
      }}
      onChange={(event) => {
        const value = event.target.value;
        const eq = parseInt(value) === captcha.challenge.value;
        setCaptchaValue(value);
        setEqualCaptcha(eq);
        dispatch(challengeCaptcha(eq));
      }}
      error={captchaValue && !equalCaptcha}
    />
  ) : null;
};
