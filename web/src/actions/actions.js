import { createAction } from 'redux-actions';

const LIST_CAMPAIGN = 'LIST_CAMPAIGN';
const LIST_SCENARIO = 'LIST_SCENARIO';

export const listCampaignAction = createAction(LIST_CAMPAIGN);
export const listScenarioAction = createAction(LIST_SCENARIO);
