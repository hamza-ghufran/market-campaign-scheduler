import { arrayToObject } from "utils/helper";

export const listCampaign = {
  LIST_CAMPAIGN: (state, action) => {
    return Object.assign({}, state, {
      error: action.payload.error,
      success: action.payload.success,
      message: action.payload.message,
      isFetching: action.payload.isFetching,

      ...formatPayload(action.payload.data, state)
    });
  },
};


function formatPayload(payload, prev_state) {
  if (!payload) return {}

  return {
    list_campaign_obj: arrayToObject(payload, "_id"),
    list_campaign: payload
  }
}