// import {
//   POST_LOGIN_BEGIN,
//   POST_LOGIN_SUCCESS,
//   POST_LOGIN_FAILURE,
//   AUTH_USER_LOADED,
//   AUTH_USER_LOADING,
//   AUTH_USER_ERROR
// } from "../actions/loginActions";

// const initialState = {
//   token: localStorage.getItem("jwt"),
//   loading: false,
//   error: null,
//   authenticated: null,
//   user: null
// };

// export default function loginReducer(state = initialState, action) {
//   switch (action.type) {
//     case POST_LOGIN_BEGIN:
//     case AUTH_USER_LOADING:
//       return {
//         ...state,
//         loading: true
//       };

//     case POST_LOGIN_SUCCESS:
//       localStorage.setItem("jwt", action.payload.token);
//       return {
//         ...state,
//         loding: false,
//         authenticated: true,
//         token: action.payload.token,
//         user: action.payload.user
//       };

//     case AUTH_USER_LOADED:
//       console.log("auth user loaded");
//       console.log(action.payload);

//       return {
//         ...state,
//         authenticated: true,
//         loading: false,
//         user: action.payload.user,
//         token: action.payload.token
//       };

//     case AUTH_USER_ERROR:
//     case POST_LOGIN_FAILURE:
//       localStorage.removeItem("jwt");
//       return {
//         ...state,
//         token: null,
//         user: null,
//         authenticated: false,
//         loading: false
//       };

//     default:
//       return state;
//   }
// }
