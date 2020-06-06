import { core } from 'utils/axios'
import { getAction } from 'utils/api'
import {
  listScenarioAction,
} from 'actions/actions';

export function listScenario(reqObj) {
  return dispatch => {
    let action = getAction(dispatch, listScenarioAction);
    action.req();
    return core.post(
      `/scenario/list`,
      reqObj
    )
      .then(action.res)
      .catch(action.err)
  }
}