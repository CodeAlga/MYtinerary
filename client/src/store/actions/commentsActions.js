import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./userActions";

export const FETCH_COMMENTS_BEGIN = "FETCH_COMMENTS_BEGIN";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

export const POST_COMMENTS_BEGIN = "POST_COMMENTS_BEGIN";
export const POST_COMMENTS_SUCCESS = "POST_COMMENTS_SUCCESS";
export const POST_COMMENTS_FAILURE = "POST_COMMENTS_FAILURE";

export const DELETE_COMMENTS_BEGIN = "DELETE_COMMENTS_BEGIN";
export const DELETE_COMMENTS_SUCCESS = "DELETE_COMMENTS_SUCCESS";
export const DELETE_COMMENTS_FAILURE = "DELETE_COMMENTS_FAILURE";

// //
// // ------- GET COMMENTS FOR GIVEN ACTIVITY
// //

export const fetchCommentsBegin = () => ({
  type: FETCH_COMMENTS_BEGIN
});

export const fetchCommentsSuccess = (comment) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: { comment }
});

export const fetchCommentsFailure = (error) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: { error }
});

export function fetchComments(activity_ref) {
  return async (dispatch) => {
    dispatch(fetchCommentsBegin());
    await axios
      .get("/comments/activity/" + activity_ref)
      .then((res) => dispatch(fetchCommentsSuccess(res.data)))
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "FETCH COMMENTS FAILURE"
          )
        );
        dispatch(fetchCommentsFailure());
      });
  };
}

export function clearComments() {
  return (dispatch) => dispatch(fetchCommentsFailure());
}

// //
// // ------- POST COMMENT
// //

export const postCommentsBegin = () => ({
  type: POST_COMMENTS_BEGIN
});

export const postCommentsSuccess = (comment) => ({
  type: POST_COMMENTS_SUCCESS,
  payload: { comment }
});

export const postCommentsFailure = (error) => ({
  type: POST_COMMENTS_FAILURE,
  payload: { error }
});

export function postComment(comment) {
  return (dispatch) => {
    dispatch(postCommentsBegin());
    axios
      .post(
        "/comments/activity/" + comment.activity_ref,

        comment,
        {
          headers: tokenConfig().headers
        }
      )
      .then((res) => {
        dispatch(postCommentsSuccess(res.data));
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.data);
          dispatch(
            returnErrors(
              err.response.data,
              err.response.status,
              "POST COMMENTS FAILURE"
            )
          );
          dispatch(postCommentsFailure());
        }
      });
  };
}

// //
// // ------- DELETE COMMENT
// //

export const deleteCommentsBegin = () => ({
  type: DELETE_COMMENTS_BEGIN
});

export const deleteCommentsSuccess = (comment) => ({
  type: DELETE_COMMENTS_SUCCESS,
  payload: { comment }
});

export const deleteCommentsFailure = (error) => ({
  type: DELETE_COMMENTS_FAILURE,
  payload: { error }
});

export function deleteComment(id) {
  return (dispatch) => {
    dispatch(deleteCommentsBegin());
    axios
      .delete("/comments/" + id, {
        headers: tokenConfig().headers
      })
      .then((res) => {
        console.log(res.data);
        dispatch(deleteCommentsSuccess(res.data));
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          dispatch(
            returnErrors(
              err.response.data,
              err.response.status,
              "DELETE COMMENTS FAILURE"
            )
          );
          dispatch(deleteCommentsFailure());
        }
      });
  };
}
