import React, { useEffect, lazy, Suspense, useState } from "react";
import { Button } from "@material-ui/core";
import { GitHub as GithubIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loginAsync, setUserInfo } from "../redux/action";
import { Link, useHistory } from "react-router-dom";
import Loading from "../components/Loading";

const UserForm = lazy(() => import("../components/UserForm"));

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, validateLogin } = useSelector(
    (state) => ({
      userInfo: state.user.userInfo,
      validateLogin: state.user.users.find(
        (val) => val.username === username && val.password === password
      ),
    }),
    shallowEqual
  );

  const triggerChanges = ({ username, password }) => {
    setUsername(username);
    setPassword(password);
  };

  const validLogin = () => {
    if (validateLogin) {
      dispatch(setUserInfo({ username, password }));
      history.replace("/");
    } else {
      alert("User not found");
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.replace("/");
    }
  }, [history, dispatch, classes, userInfo]);

  return (
    <div className={classes.root}>
      <Suspense fallback={<Loading />}>
        <UserForm triggerChanges={triggerChanges} />
      </Suspense>
      <div className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            validLogin();
          }}
          fullWidth={true}
        >
          Login
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
          Don't have an account? <Link to="/register">Sign up here!</Link>
        </p>
      </div>
    </div>
  );
};
