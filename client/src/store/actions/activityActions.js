export const FETCH_ACTIVITIES_BEGIN = "FETCH_ACTIVITIES_BEGIN";
export const FETCH_ACTIVITIES_SUCCESS = "FETCH_ACTIVITIES_SUCCESS";
export const FETCH_ACTIVITIES_FAILURE = "FETCH_ACTIVITIES_FAILURE";

export const fetchActivitiesBegin = () => ({
  type: FETCH_ACTIVITIES_BEGIN
});

export const fetchActivitiesSuccess = (activities) => ({
  type: FETCH_ACTIVITIES_SUCCESS,
  payload: { activities }
});

export const fetchActivitiesFailure = (error) => ({
  type: FETCH_ACTIVITIES_FAILURE,
  payload: { error }
});

export function fetchActivities(itinerary_ref) {
  return (dispatch) => {
    dispatch(fetchActivitiesBegin());
    return fetch("/activities/itinerary/" + itinerary_ref)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          dispatch(fetchActivitiesSuccess(json));
          return json;
        }, 500);
      })
      .catch((error) => dispatch(fetchActivitiesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText + " Oops, sorry");
  }
  return response;
}
