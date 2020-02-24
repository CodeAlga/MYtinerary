import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";

// export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
// export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
// export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

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
  return async (dispatch, getState) => {
    dispatch(authUserBegin());
    await tokenConfig(getState);
    axios
      .get("/authentication/user", tokenConfig())
      .then((res) => {
        dispatch(authUserSuccess(res.data));
      })
      .catch((err) => {
        if (!token) {
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
  return (dispatch) => {
    dispatch(postUsersBegin());
    axios
      .post("/users/user", user)
      //.then(handleError)
      .then((res) => {
        console.log(res.data);

        dispatch(postUsersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(clearErrors());
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "REGISTER FAILED"
          )
        );
        dispatch(postUsersFailure(err.response));
      });
  };
}

// //
// //------ FETCH USERS
// //
// export const fetchUsersBegin = () => ({
//   type: FETCH_USERS_BEGIN
// });

// export const fetchUsersSuccess = (users) => ({
//   type: FETCH_USERS_SUCCESS,
//   payload: { users }
// });

// export const fetchUsersFailure = (error) => ({
//   type: FETCH_USERS_FAILURE,
//   payload: { error }
// });

// export function fetchUsers() {
//   return async (dispatch) => {
//     dispatch(fetchUsersBegin());
//     await fetch("/users/all")
//       //.then(handleError)
//       .then((res) => res.json())
//       .then((json) => {
//         dispatch(fetchUsersSuccess(json));
//         return json;
//       })
//       .catch((error) => dispatch(fetchUsersFailure(error)));
//   };
// }

// // Handle HTTP errors since fetch won't.
// function handleError(response) {
//   if (!response.ok) {
//     throw Error(
//       response +
//         "Sorry, there was a propblem creating your account. Please try again."
//     );
//   }
//   return response;
// }
