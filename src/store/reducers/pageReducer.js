// Have initial state for when state is not ready to be passed
const initState = {
  fields: null,
};

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SUCCESS":
      console.log(action.data);
      return {
        ...state,
        fields: action.data,
      };
    case "GET_FAIL":
      console.log("Error", action.err);
      return {
        ...state,
        fields: false,
      };
    default:
      return state;
  }
};

export default pageReducer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
