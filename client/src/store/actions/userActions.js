import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";

export const POST_USERS_BEGIN = "POST_USERS_BEGIN";
export const POST_USERS_SUCCESS = "POST_USERS_SUCCESS";
export const POST_USERS_FAILURE = "POST_USERS_FAILURE";

export const AUTH_USER_BEGIN = "AUTH_USER_BEGIN";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const AUTH_USER_FAILURE = "AUTH_USER_FAILURE";

//
// ----- TOKEN CONFIG
//

export const tokenConfig = () => {
  //
  // --- GET TOKEN FROM LOCAL STORAGE

  const token = localStorage.getItem("jwt");

  //
  // --- HEADERS
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// //
// //------- CHECK TOKEN AND LOAD USER
// //

export const authUserBegin = () => ({
  type: AUTH_USER_BEGIN
});

export const authUserSuccess = (user) => ({
  type: AUTH_USER_SUCCESS,
  payload: { user }
});

export const authUserFailure = (error) => ({
  type: AUTH_USER_FAILURE,
  payload: { error }
});

export function authUser() {
  const token = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch(authUserBegin());
    tokenConfig();

    axios
      .get("/authentication/user", tokenConfig())
      .then((res) => {
        dispatch(authUserSuccess(res.data));
      })
      .catch((err) => {
        if (!token) {
          dispatch(
            returnErrors(err.response.data, err.response.status, "AUTH FAILED")
          );
          dispatch(authUserFailure());
        }
      });
    //}
  };
}

// //
// //------ POST USERS TO DB
// //
export const postUsersBegin = () => ({
  type: POST_USERS_BEGIN
});

export const postUsersSuccess = (users) => ({
  type: POST_USERS_SUCCESS,
  payload: { users }
});

export const postUsersFailure = (error) => ({
  type: POST_USERS_FAILURE,
  payload: { error }
});

export function postUsers(user) {
  console.log(user);

  return (dispatch) => {
    dispatch(postUsersBegin());
    axios
      .post("/users/user", user)
      //.then(handleError)
      .then((res) => {
        dispatch(postUsersSuccess(res.data));
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          dispatch(clearErrors());
          dispatch(
            returnErrors(
              err.response.data,
              err.response.status,
              "REGISTER FAILED"
            )
          );
          dispatch(postUsersFailure(err.response));
        }
      });
  };
}
