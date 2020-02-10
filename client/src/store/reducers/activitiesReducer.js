import {
  FETCH_ACTIVITIES_BEGIN,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE
} from "../actions/activityActions";

const initialState = {
  activities: [],
  loading: false,
  error: null
};

export default function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES_BEGIN:
      return {
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        ...state,
        loading: true,
        error: null
      };

    case FETCH_ACTIVITIES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        activities: action.payload.activities
      };

    case FETCH_ACTIVITIES_FAILURE:
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
        activities: []
      };

    default:
      return state;
  }
}
