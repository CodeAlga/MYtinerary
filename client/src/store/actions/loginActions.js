import axios from "axios";

export const POST_LOGIN_BEGIN = "POST_LOGIN_BEGIN";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAILURE = "POST_LOGIN_FAILURE";

//
//------- POST DATA TO LOGIN
//

export const postLoginBegin = () => ({
  type: POST_LOGIN_BEGIN
});

export const postLoginSuccess = (token) => ({
  type: POST_LOGIN_SUCCESS,
  payload: { token }
});

export const postLoginFailure = (error) => ({
  type: POST_LOGIN_FAILURE,
  payload: { error }
});

export function postLogin(user) {
  return (dispatch) => {
    dispatch(postLoginBegin());
    axios
      .post("/users/login", user)
      //.then(handleError)
      .then((res) => {
        console.log("logkinf for response " + res);

        dispatch(postLoginSuccess(res));
      })
      .catch((err) => {
        console.log(err);

        dispatch(postLoginFailure(err.response.data.msg));
      });
  };
}

// Handle HTTP errors since fetch won't.
// function handleError(response) {
//   if (!response.ok) {
//     throw Error(
//       response +
//         "Sorry, there was a propblem loging to your account. Please try again."
//     );
//   }
//   return response;
// }
