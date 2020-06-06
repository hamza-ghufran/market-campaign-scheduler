import { handleActions } from 'redux-actions';

import { listCampaign } from './list-campaign';

const initialState = {
  error: false,
  message: null,
  success: false,
  isFetching: true,

  list_campaign: {},
};

export default handleActions(
  {
    ...listCampaign,
  },
  initialState
)