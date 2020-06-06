export const listScenario = {
  LIST_SCENARIO: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload.error,
      success: action.payload.success,
      isFetching: action.payload.isFetching,
      
      list_scenario: action.payload.data,
    });
  }
};
