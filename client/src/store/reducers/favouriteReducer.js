import {
  POST_FAV_BEGIN,
  POST_FAV_SUCCESS,
  POST_FAV_FAILURE,
  REMOVE_FAV_BEGIN,
  REMOVE_FAV_SUCCESS,
  REMOVE_FAV_FAILURE
} from "../actions/favouriteActions";

const initialState = {
  favourite: "",
  loading: false,
  error: null
};

export default function favReducer(state = initialState, action) {
  switch (action.type) {
    case POST_FAV_BEGIN:
    case REMOVE_FAV_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case POST_FAV_SUCCESS:
    case REMOVE_FAV_SUCCESS:
      return {
        ...state,
        loading: false,
        favourite: action.payload.favourite
      };

    case POST_FAV_FAILURE:
    case REMOVE_FAV_FAILURE:
      return {
        ...state,
        loading: false,
        error: null
      };

    default:
      return state;
  }
}
