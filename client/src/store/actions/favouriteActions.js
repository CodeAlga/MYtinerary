import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import { tokenConfig } from "./userActions";

export const POST_FAV_BEGIN = "POST_FAV_BEGIN";
export const POST_FAV_SUCCESS = "POST_FAV_SUCCESS";
export const POST_FAV_FAILURE = "POST_FAV_FAILURE";

export const REMOVE_FAV_BEGIN = "REMOVE_FAV_BEGIN";
export const REMOVE_FAV_SUCCESS = "REMOVE_FAV_SUCCESS";
export const REMOVE_FAV_FAILURE = "REMOVE_FAV_FAILURE";

// //
// // -------- ADDING FAVOURITE
// //

export const postFavBegin = () => ({
  type: POST_FAV_BEGIN
});

export const postFavSuccess = (fav) => ({
  type: POST_FAV_SUCCESS,
  payload: { fav }
});

export const postFavFailure = (error) => ({
  type: POST_FAV_FAILURE,
  payload: { error }
});

export function addFav(fav) {
  console.log("dispatching");
  console.log(fav);

  return (dispatch, getState) => {
    const user_id = getState().auth.user._id;
    dispatch(postFavBegin());

    axios
      .put("/users/user/" + user_id, fav, {
        headers: tokenConfig().headers
      })
      .then((res) => {
        dispatch(postFavSuccess(res.data));
      })
      .catch((err) => {
        if (err) {
          dispatch(clearErrors());
          dispatch(returnErrors(err.response.data, err.response.status, null));
          dispatch(postFavFailure());
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
      .delete("/users/user/" + user_id, fav, {
        headers: tokenConfig().headers
      })
      .then((res) => {
        dispatch(removeFavSuccess(res.data));
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
