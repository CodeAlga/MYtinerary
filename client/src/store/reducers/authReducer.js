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

import {
  PUT_FAV_BEGIN,
  PUT_FAV_SUCCESS,
  PUT_FAV_FAILURE,
  REMOVE_FAV_BEGIN,
  REMOVE_FAV_SUCCESS,
  REMOVE_FAV_FAILURE
} from "../actions/favouriteActions";

const initialState = {
  token: localStorage.getItem("jwt"),
  authenticated: false,
  loading: false,
  user: null,
  favourites: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_BEGIN:
    case POST_LOGIN_BEGIN:
    case POST_USERS_BEGIN:
    case PUT_FAV_BEGIN:
    case REMOVE_FAV_BEGIN:
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
        user: action.payload.users,
        favourites: action.payload.user.auth.favourites
      };

    case AUTH_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload.user,
        favourites: action.payload.user.auth.favourites
      };

    case PUT_FAV_SUCCESS:
      return {
        ...state,
        loading: false,
        //...state.user.auth.favourites.push(action.payload.user.fav)
        favourites: [action.payload.user.fav, ...state.favourites]
      };

    case REMOVE_FAV_SUCCESS:
      return {
        ...state,
        loading: false,
        //...state.user.auth.favourites.push(action.payload.user.fav)
        favourites: state.favourites.filter(
          (fav) => fav !== action.payload.user.fav
        )
      };

    case PUT_FAV_FAILURE:
    case REMOVE_FAV_FAILURE:
      return {
        ...state,
        loading: false,
        error: null
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
