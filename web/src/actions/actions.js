import { createAction } from 'redux-actions';

const LIST_CAMPAIGN = 'LIST_CAMPAIGN';
const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';

const LIST_SCENARIO = 'LIST_SCENARIO';
const UPDATE_SCENARIO = 'UPDATE_SCENARIO';

export const updateCampaignAction = createAction(UPDATE_CAMPAIGN);
export const listCampaignAction = createAction(LIST_CAMPAIGN);

export const updateScenarioAction = createAction(UPDATE_SCENARIO);
export const listScenarioAction = createAction(LIST_SCENARIO);
