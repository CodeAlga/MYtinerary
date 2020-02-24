import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";

export const POST_LOGIN_BEGIN = "POST_LOGIN_BEGIN";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAILURE = "POST_LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

// //
// //------- LOGIN
// //

export const postLoginBegin = () => ({
  type: POST_LOGIN_BEGIN
});

export const postLoginSuccess = (user) => ({
  type: POST_LOGIN_SUCCESS,
  payload: { user }
});

export const postLoginFailure = (error) => ({
  type: POST_LOGIN_FAILURE,
  payload: { error }
});

export function postLogin(user) {
  return (dispatch) => {
    dispatch(postLoginBegin());
    console.log("here in dispatch");
    console.log(user);

    axios
      .post("/authentication", user)

      .then((res) => {
        dispatch(postLoginSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);

        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN FAILED")
        );
        dispatch(postLoginFailure());
      });
  };
}

// //
// // --------- LOG OUT
// //

export const logOut = () => ({
  type: LOGOUT
});

export function logout() {
  return (dispatch) => {
    dispatch(logOut());
  };
}

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
