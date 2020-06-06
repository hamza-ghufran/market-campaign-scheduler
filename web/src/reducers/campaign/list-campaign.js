export const listCampaign = {
  LIST_CAMPAIGN: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload.error,
      success: action.payload.success,
      isFetching: action.payload.isFetching,
      
      list_campaign: action.payload.data,
    });
  }
};