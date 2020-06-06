import "isomorphic-fetch";

/**
 *
 * @param {*} dispatch
 * @param {*} action
 */

export function getAction(dispatch, action) {
  return {
    req: function() {
      return dispatch(action({ isFetching: true, message: null }));
    },
    res: function(response) {
      return dispatch(action(handlePayload(response)));
    },
    err: function(error) {
      return dispatch(action(handleError(error)));
    }
  };
}

/**
 *
 * @param {*} response
 */

export function handlePayload(response) {
  if (response.data.redirect) {
    window.location.href = response.data.redirect;
  }

  return {
    isFetching: false,
    success: true,
    data: response.data.data,
    message: response.data.message
  };
}

/**
 * A utility to handle error from fetch calls
 * .
 * @param error The error object from axios response
 */

export function handleError(error) {
  if (error.response) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.redirect
    ) {
      window.location.href = error.response.data.error.redirect;
    }

    return {
      isFetching: false,
      success: false,
      message:
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message,
      code: error.response.data.error.code
    };
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }

  return {
    isFetching: false,
    success: false
  };
}
