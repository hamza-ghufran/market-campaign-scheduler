import { handleActions } from 'redux-actions';

import { listScenario } from './list-scenario';

const initialState = {
  error: false,
  message: null,
  success: false,
  isFetching: true,
  response_data: null,

  list_scenario: {},
};

export default handleActions(
  {
    ...listScenario,
  },
  initialState
)