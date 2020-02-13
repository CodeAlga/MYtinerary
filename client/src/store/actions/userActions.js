export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const POST_USERS_BEGIN = "POST_USERS_BEGIN";
export const POST_USERS_SUCCESS = "POST_USERS_SUCCESS";
export const POST_USERS_FAILURE = "POST_USERS_FAILURE";

//
//------ FETCH USERS
//
export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});

export function fetchUsers(user_ref) {
  return async (dispatch) => {
    dispatch(fetchUsersBegin());
    await fetch("/users/user" + user_ref)
      .then(handleError)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchUsersSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchUsersFailure(error)));
  };
}

//
//------ POST USERS
//
export const postUsersBegin = () => ({
  type: POST_USERS_BEGIN
});

export const postUsersSuccess = (users) => ({
  type: POST_USERS_SUCCESS,
  payload: { users }
});

export const postUsersFailure = (error) => ({
  type: POST_USERS_FAILURE,
  payload: { error }
});

export function postUsers(user) {
  return (dispatch) => {
    dispatch(postUsersBegin());
    user
      .post("/" + user)
      .then(handleError)
      .then((res) => res.json())
      .then((json) => {
        dispatch(postUsersSuccess(json));
        return json;
      })
      .catch((error) => dispatch(postUsersFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleError(response) {
  if (!response.ok) {
    throw Error(
      response.status +
        "Sorry, there was a propblem creating your account. Please try again."
    );
  }
  return response;
}
