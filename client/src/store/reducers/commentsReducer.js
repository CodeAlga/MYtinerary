import {
  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  POST_COMMENTS_BEGIN,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_FAILURE,
  DELETE_COMMENTS_BEGIN,
  DELETE_COMMENTS_SUCCESS,
  DELETE_COMMENTS_FAILURE
} from "../actions/commentsActions";

const initialState = {
  comments: [],
  loading: false,
  error: null
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_COMMENTS_BEGIN:
    case FETCH_COMMENTS_BEGIN:
    case DELETE_COMMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case POST_COMMENTS_SUCCESS:
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.concat(action.payload.comment)
      };
    case DELETE_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case POST_COMMENTS_FAILURE:
    case FETCH_COMMENTS_FAILURE:
    case DELETE_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        comments: []
      };

    default:
      return state;
  }
}
