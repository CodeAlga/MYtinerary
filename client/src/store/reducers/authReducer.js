import {
  POST_USERS_BEGIN,
  POST_USERS_SUCCESS,
  POST_USERS_FAILURE,
  AUTH_USER_BEGIN,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE
} from "../actions/userActions";

import {
  POST_LOGIN_BEGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  LOGOUT
} from "../actions/loginActions";

const initialState = {
  token: localStorage.getItem("jwt"),
  authenticated: false,
  loading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_BEGIN:
    case POST_LOGIN_BEGIN:
    case POST_USERS_BEGIN:
      return {
        ...state,
        loading: true
      };

    case POST_LOGIN_SUCCESS:
    case POST_USERS_SUCCESS:
      const token = action.payload.users.token;
      localStorage.setItem("jwt", token);
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload.users
      };

    case AUTH_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload.user
      };

    case AUTH_USER_FAILURE:
    case POST_LOGIN_FAILURE:
    case POST_USERS_FAILURE:
    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
