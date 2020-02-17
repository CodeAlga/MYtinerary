import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  POST_USERS_BEGIN,
  POST_USERS_SUCCESS,
  POST_USERS_FAILURE
} from "../actions/userActions";

const initialState = {
  users: [],
  loading: false,
  error: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      return {
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server

      return {
        ...state,
        loading: false,
        users: state.users
      };

    case FETCH_USERS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        users: []
      };

    // --------  POSTING USERS REDUCER

    case POST_USERS_BEGIN:
      return {
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        ...state,
        loading: true,
        error: null
      };

    case POST_USERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        users: state.users
      };

    case POST_USERS_FAILURE:
      console.log(action.payload.error);

      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        users: []
      };
    default:
      return state;
  }
}
