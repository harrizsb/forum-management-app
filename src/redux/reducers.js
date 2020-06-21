import {
  INIT_NEW_CAPTCHA,
  CHALLENGE_CAPTCHA,
  TOGGLE_LOADING,
  LOGIN,
  LOGOUT,
  SET_USER_INFO,
  ADD_USER,
  ADD_TOPIC,
  ADD_COMMENT,
} from "./actionTypes";

export const initialStateApp = {
  loading: false,
  overlayLoading: false,
  captcha: null,
  equalCaptcha: false,
  topics: [],
};

export const app = (state = initialStateApp, action) => {
  switch (action.type) {
    case INIT_NEW_CAPTCHA:
      const numbers = Array.from(Array(2), () =>
        Math.round(Math.random() * 10)
      );
      const value = numbers.reduce((initVal, val) => initVal + val, 0);
      return {
        ...state,
        captcha: {
          challenge: {
            value,
            numbers,
          },
        },
      };

    case CHALLENGE_CAPTCHA:
      return {
        ...state,
        equalCaptcha: action.payload,
      };

    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
        overlayLoading: action.payload,
      };

    case ADD_TOPIC:
      return {
        ...state,
        topics: [
          ...state.topics,
          {
            ...action.payload,
            id: state.topics.length + 1,
          },
        ],
      };

    case ADD_COMMENT:
      const topicsIndex = state.topics.findIndex(
        (val) => val.id === parseInt(action.payload.topicID)
      );
      const tmpTopics = {
        ...state.topics[topicsIndex],
        comments: [
          ...(state.topics[topicsIndex].comments || []),
          {
            username: action.payload.username,
            comment: action.payload.comment,
          },
        ],
      };
      const topics = state.topics;
      topics[topicsIndex] = tmpTopics;

      return {
        ...state,
        topics: topics,
      };

    default:
      return state;
  }
};

export const initialStateUser = {
  loggedIn: false,
  userInfo: null,
  users: [],
};

export const user = (state = initialStateUser, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };

    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userInfo: null,
      };

    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};
