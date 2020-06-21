import { auth } from "../utility/firebase";
import firebase from "firebase/app";
import {
  INIT_NEW_CAPTCHA,
  CHALLENGE_CAPTCHA,
  TOGGLE_LOADING,
  LOGIN,
  SET_USER_INFO,
  LOGOUT,
  ADD_USER,
  ADD_TOPIC,
  ADD_COMMENT,
} from "./actionTypes";

export const addComment = ({ comment, topicID, username }) => ({
  type: ADD_COMMENT,
  payload: {
    comment,
    topicID,
    username,
  },
});

export const addTopic = (topic) => ({
  type: ADD_TOPIC,
  payload: topic,
});

export const newCaptcha = () => ({
  type: INIT_NEW_CAPTCHA,
});

export const challengeCaptcha = (res) => ({
  type: CHALLENGE_CAPTCHA,
  payload: res,
});

export const toggleLoading = (overlay) => ({
  type: TOGGLE_LOADING,
  payload: overlay,
});

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const addUser = (userData) => ({
  type: ADD_USER,
  payload: userData,
});

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const loginAsync = () => (dispatch) => {
  const _toggle_loading = () => {
    dispatch({
      type: TOGGLE_LOADING,
    });
  };

  _toggle_loading();

  return auth
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then(({ user }) => {
      dispatch({
        type: SET_USER_INFO,
        payload: user,
      });
    })
    .catch(() => {
      dispatch({
        type: LOGOUT,
      });
    })
    .finally(_toggle_loading);
};

export const logoutAsync = () => (dispatch) => {
  const _toggle_loading = () => {
    dispatch({
      type: TOGGLE_LOADING,
    });
  };

  _toggle_loading();

  return auth.signOut().finally(() => {
    dispatch({
      type: SET_USER_INFO,
      payload: null,
    });
    dispatch({
      type: LOGOUT,
    });
    _toggle_loading();
  });
};
