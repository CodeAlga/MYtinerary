import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import { tokenConfig } from "./userActions";

export const PUT_FAV_BEGIN = "PUT_FAV_BEGIN";
export const PUT_FAV_SUCCESS = "PUT_FAV_SUCCESS";
export const PUT_FAV_FAILURE = "PUT_FAV_FAILURE";

export const REMOVE_FAV_BEGIN = "REMOVE_FAV_BEGIN";
export const REMOVE_FAV_SUCCESS = "REMOVE_FAV_SUCCESS";
export const REMOVE_FAV_FAILURE = "REMOVE_FAV_FAILURE";

// //
// // -------- ADDING FAVOURITE
// //

export const putFavBegin = () => ({
  type: PUT_FAV_BEGIN
});

export const putFavSuccess = (user) => ({
  type: PUT_FAV_SUCCESS,
  payload: { user }
});

export const putFavFailure = (error) => ({
  type: PUT_FAV_FAILURE,
  payload: { error }
});

export function addFav(fav) {
  return (dispatch, getState) => {
    const user_id = getState().auth.user._id;
    dispatch(putFavBegin());

    axios
      .put(
        "/users/addfav/" + user_id,
        fav /* , {
        headers: tokenConfig().headers
      } */
      )
      .then((res) => {
        dispatch(putFavSuccess(fav));
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          dispatch(clearErrors());
          dispatch(returnErrors(err.response.data, err.response.status, null));
          dispatch(putFavFailure());
        }
      });
  };
}

// //
// // -------- REMOVE FAVOURITE
// //

export const removeFavBegin = () => ({
  type: REMOVE_FAV_BEGIN
});

export const removeFavSuccess = (user) => ({
  type: REMOVE_FAV_SUCCESS,
  payload: { user }
});

export const removeFavFailure = (error) => ({
  type: REMOVE_FAV_FAILURE,
  payload: { error }
});

export function removeFav(fav) {
  return (dispatch, getState) => {
    const user_id = getState().auth.user._id;
    dispatch(removeFavBegin());

    axios
      .put("/users/removefav/" + user_id, fav)
      .then((res) => {
        dispatch(removeFavSuccess(fav));
      })
      .catch((err) => {
        if (err) {
          dispatch(clearErrors());
          dispatch(returnErrors(err.response.data, err.response.status, null));
          dispatch(removeFavFailure());
        }
      });
  };
}
