import React, { lazy, Suspense, useState } from "react";
import { Button } from "@material-ui/core";
import { GitHub as GithubIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loginAsync, addUser, newCaptcha } from "../redux/action";
import { useHistory } from "react-router-dom";

import Loading from "../components/Loading";

const UserForm = lazy(() => import("../components/UserForm"));
const CaptchaForm = lazy(() => import("../components/CaptchaForm"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& > form > *": {
      margin: theme.spacing(1),
    },
    margin: theme.spacing(1),
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default () => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { findUserByUsername, equalCaptcha } = useSelector(
    (state) => ({
      findUserByUsername: state.user.users.find(
        (val) => val.username === username
      ),
      equalCaptcha: state.app.equalCaptcha,
    }),
    shallowEqual
  );

  const triggerChanges = ({ username, password }) => {
    setUsername(username);
    setPassword(password);
  };

  const register = () => {
    if (!findUserByUsername) {
      dispatch(
        addUser({
          username,
          password,
        })
      );
      dispatch(newCaptcha());
      alert("User registered successfully");
      history.replace("/");
    } else {
      alert("User already registered");
    }
  };

  return (
    <div className={classes.root}>
      <Suspense fallback={<Loading />}>
        <UserForm triggerChanges={triggerChanges}>
          <Suspense fallback={<Loading />}>
            <CaptchaForm />
          </Suspense>
        </UserForm>
      </Suspense>
      <div className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            register();
          }}
          fullWidth={true}
          disabled={!equalCaptcha || username === "" || password === ""}
          data-testid="register-btn"
        >
          Register
        </Button>
        <span>or</span>
        <Button
          variant="contained"
          endIcon={<GithubIcon />}
          onClick={() => {
            dispatch(loginAsync());
          }}
          fullWidth={true}
        >
          Login with Github
        </Button>
        <p>
          Already have an account? <Link to="/login">Sign In here!</Link>
        </p>
      </div>
    </div>
  );
};
