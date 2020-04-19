// Have initial state for when state is not ready to be passed
const initState = {
  authError: null,
  authErrorDetails: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("Error", action.err);
      return {
        ...state,
        authErrorDetails: action.err,
      };
    case "LOGIN_SUCCESS":
      console.log("Login success");
      return {
        ...state,
        authErrorDetails: null,
      };
    case "LOGIN_ANON_SUCCESS":
      console.log("Login of anonymous user success");
      return {
        ...state,
        authErrorDetails: null,
      };
    case "LOGIN_ANON_ERROR":
      console.log("Could not login as anonymous user");
      return {
        ...state,
        authErrorDetails: action.err,
      };
    case "SIGNOUT_SUCCESS":
      console.log("Signout success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("Signup success");
      return {
        ...state,
        authError: null,
        authErrorDetails: null,
      };
    case "SIGNUP_ERROR":
      console.log("Signup error", action.err);
      return {
        ...state,
        authErrorCode: action.errCode,
        authError: action.err.message,
        authErrorDetails: action.err,
      };
    default:
      return state;
  }
};

export default authReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
