export const FETCH_ITINERARIES_BEGIN = "FETCH_ITINERARIES_BEGIN";
export const FETCH_ITINERARIES_SUCCESS = "FETCH_ITINERARIES_SUCCESS";
export const FETCH_ITINERARIES_FAILURE = "FETCH_ITINERARIES_FAILURE";

export const fetchItinerariesBegin = () => ({
  type: FETCH_ITINERARIES_BEGIN
});

export const fetchItinerariesSuccess = (itineraries) => ({
  type: FETCH_ITINERARIES_SUCCESS,
  payload: { itineraries }
});

export const fetchItinerariesFailure = (error) => ({
  type: FETCH_ITINERARIES_FAILURE,
  payload: { error }
});

export function fetchItineraries(city_ref) {
  return (dispatch) => {
    dispatch(fetchItinerariesBegin());
    return fetch("/itineraries/city/" + city_ref)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          dispatch(fetchItinerariesSuccess(json));
          return json;
        }, 1000);
      })
      .catch((error) => dispatch(fetchItinerariesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText + " Oops, sorry");
  }
  return response;
}
