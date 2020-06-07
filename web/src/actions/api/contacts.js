import { core } from 'utils/axios'
import { getAction } from 'utils/api'
import {
  uploadContactsAction,
} from 'actions/actions';

export function uploadContacts(reqObj) {
  return dispatch => {
    let action = getAction(dispatch, uploadContactsAction);
    action.req();
    return core.post(
      `/contacts/upload`,
      reqObj
    )
      .then(action.res)
      .catch(action.err)
  }
}