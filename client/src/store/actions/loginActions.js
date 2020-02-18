// import axios from "axios";
// import { POST_USERS_BEGIN } from "./userActions";

// export const POST_LOGIN_BEGIN = "POST_LOGIN_BEGIN";
// export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
// export const POST_LOGIN_FAILURE = "POST_LOGIN_FAILURE";

// //
// //------- POST DATA TO LOGIN
// //

// export const postLoginBegin = () => ({
//   type: POST_LOGIN_BEGIN
// });

// export const postLoginSuccess = () => ({
//   type: POST_LOGIN_SUCCESS,
//   payload: { token }
// });

// export const postLoginFailure = () => ({
//   type: POST_LOGIN_FAILURE,
//   payload: { error }
// });

// export function postLogin() {
//   return (dispatch) => {
//     dispatch(postLoginBegin());
//     axios
//       .post("/login", user)
//       .then(handleError)
//       .then((res) => {
//         dispatch(postLoginSuccess(res));
//       })
//       .catch((err) => {
//         dispatch(postLoginFailure(err.response.data.msg));
//       });
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
