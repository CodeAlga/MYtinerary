import {
  POST_USERS_BEGIN,
  POST_USERS_SUCCESS,
  POST_USERS_FAILURE
} from "../actions/userActions";

import {
  POST_LOGIN_BEGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  AUTH_USER_BEGIN,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE
} from "../actions/loginActions";

const initialState = {
  //token:
  //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGZlOWUzZGM3ZmI2MTNiNmI5YzIyMyIsImlhdCI6MTU4MjM4NTk4MSwiZXhwIjoxNTg0OTc3OTgxfQ.OR226ofv5eZEk69mnx1g6jEzd2GeL6NAjjPod5BC-YU",
  token: localStorage.getItem("jwt"),
  authenticated: null,
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

    case AUTH_USER_SUCCESS:
    case POST_LOGIN_SUCCESS:
    case POST_USERS_SUCCESS:
      localStorage.setItem("jwt", action.payload.token);
      return {
        ...state,
        //...action.payload,
        authenticated: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token
      };

    case AUTH_USER_FAILURE:
    case POST_LOGIN_FAILURE:
    case POST_USERS_FAILURE:
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
