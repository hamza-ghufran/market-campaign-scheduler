import { core } from 'utils/axios'
import { getAction } from 'utils/api'
import {
  listScenarioAction,
  updateScenarioAction
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

export function addScenario(reqObj) {
  return dispatch => {
    let action = getAction(dispatch, updateScenarioAction);
    action.req();
    return core.post(
      `/scenario/add`,
      reqObj
    )
      .then(action.res)
      .catch(action.err)
  }
}