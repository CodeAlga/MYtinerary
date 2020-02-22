import axios from "axios";
import { returnErrors } from "./errorActions";

export const POST_LOGIN_BEGIN = "POST_LOGIN_BEGIN";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAILURE = "POST_LOGIN_FAILURE";

export const AUTH_USER_BEGIN = "AUTH_USER_BEGIN";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const AUTH_USER_FAILURE = "AUTH_USER_FAILURE";

//
// ----- TOKEN CONFIG
//

export const tokenConfig = (getState) => {
  //
  // --- GET TOKEN FROM LOCAL STORAGE

  const token = getState().auth.token;

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
  return (dispatch, getState) => {
    dispatch(authUserBegin());

    axios
      .get("/authentication/user", tokenConfig(getState))
      .then((res) => {
        dispatch(authUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(authUserFailure());
      });
  };
}

// export const authUser = () => (dispatch, getState) => {
//   console.log("inside action load user", getState().auth);
//   // Call user loading
//   dispatch({ type: AUTH_USER_BEGIN });
//   //console.log(localStorage.getItem("token"));

//   // Fetch the user
//   axios
//     .get("/authentication", tokenConfig(getState))
//     .then((res) =>
//       dispatch({
//         type: AUTH_USER_SUCCESS,
//         payload: res.data
//       })
//     )
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_USER_FAILURE
//       });
//     });
// };

// //
// //------- POST DATA TO LOGIN
// //

// export const postLoginBegin = () => ({
//   type: POST_LOGIN_BEGIN
// });

// export const postLoginSuccess = (token) => ({
//   type: POST_LOGIN_SUCCESS,
//   payload: { token }
// });

// export const postLoginFailure = (error) => ({
//   type: POST_LOGIN_FAILURE,
//   payload: { error }
// });

// export function postLogin(user) {
//   return (dispatch) => {
//     dispatch(postLoginBegin());
//     axios
//       .post("/users-social/login", user)
//       //.then(handleError)
//       .then((res) => {
//         dispatch(postLoginSuccess(res));
//       })
//       .catch((err) => {
//         console.log(err);

//         dispatch(postLoginFailure(err.response.data.msg));
//       });
//   };
// }

// //
// // CHECK TOKEN AND LOAD USER
// //
// export const authUserLoading = () => ({
//   type: AUTH_USER_LOADING
// });

// export const authUserLoaded = (user) => ({
//   type: AUTH_USER_LOADED,
//   payload: { user }
// });

// export const authUserError = (error) => ({
//   type: AUTH_USER_ERROR,
//   payload: { error }
// });

// export function loadUser() {
//   return (dispatch) => {
//     dispatch(authUserLoading());
//     axios
//       .get("/users/" /* , tokenConfig(getState) */)
//       .then((res) => dispatch(authUserLoaded(res)))
//       .catch((err) => {
//         dispatch(authUserError(err.response));
//       });
//   };
// }

// // Setup config Token

// // export const tokenConfig = (getState) => {
// //   // Get token from localstorage
// //   const token = getState().auth.token;

// //   Headers
// //   const config: IConfigHeaders = {
// //     headers: {
// //       "Content-type": "application/json"
// //     }
// //   };

// //   If token, add to headers
// //     if (token) {
// //       config.headers["x-auth-token"] = token;
// //     }

// //    return config;
// // };

// // Handle HTTP errors since fetch won't.
// // function handleError(response) {
// //   if (!response.ok) {
// //     throw Error(
// //       response +
// //         "Sorry, there was a propblem loging to your account. Please try again."
// //     );
// //   }
// //   return response;
// // }
