// import {
//   PUT_FAV_BEGIN,
//   PUT_FAV_SUCCESS,
//   PUT_FAV_FAILURE,
//   REMOVE_FAV_BEGIN,
//   REMOVE_FAV_SUCCESS,
//   REMOVE_FAV_FAILURE
// } from "../actions/favouriteActions";

// const initialState = {
//   favourites: [],
//   loading: false,
//   error: null
// };

// export default function favReducer(state = initialState, action) {
//   switch (action.type) {
//     case PUT_FAV_BEGIN:
//     case REMOVE_FAV_BEGIN:
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };

//     case PUT_FAV_SUCCESS:
//     case REMOVE_FAV_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         favourites: action.payload.favourite
//       };

//     case PUT_FAV_FAILURE:
//     case REMOVE_FAV_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: null
//       };

//     default:
//       return state;
//   }
// }
