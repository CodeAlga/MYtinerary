// import {
//   POST_LOGIN_BEGGIN,
//   POST_LOGIN_SUCCESS,
//   POST_LOGIN_FAILURE
// } from "../actions/loginActions";

// const initialState = {
//   token: {},
//   loading: false,
//   error: null
// };

// export default function loginReducer(state = initialState, action) {
//   switch (action.type) {
//     case POST_LOGIN_BEGIN:
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };

//     case POST_LOGIN_SUCCESS:
//       return {
//         ...state,
//         loding: false,
//         token: action.payload.token
//       };

//     case POST_LOGIN_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error,
//         token: {}
//       };

//     default:
//       return state;
//   }
// }
