export const FETCH_CITIES_BEGIN = "FETCH_CITIES_BEGIN";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE";

export const fetchCitiesBegin = () => ({
  type: FETCH_CITIES_BEGIN
});

export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: { cities }
});

export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: { error }
});

export function fetchCities() {
  return (dispatch) => {
    dispatch(fetchCitiesBegin());
    return fetch("/cities/all")
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchCitiesSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchCitiesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText + " Oops, sorry");
  }
  return response;
}

// export const REQUEST_CITIES = "FETCH_CITIES";
// export const RECEIVE_CITIES = "REFRESH_CITIES";

// export function requestCities(listCities) {
//   return {
//     type: REQUEST_CITIES,
//     listCities
//   };
// }

// export function receiveCities(listCities) {
//   return {
//     type: RECEIVE_CITIES,
//     listCities,
//     posts: json.data,
//     receivedAt: Date.now()
//   };
// }
// export function fetchCities(listCities) {
//   return (dispatch) => {
//     dispatch(requestCities(listCities));
//     return fetch("cities/all")
//       .then(
//         (res) => res.json(),
//         (error) => console.log("Shite", error)
//       )
//       .then((json) => dispatch(receiveCities(listCities, json)));
//   };
// }
