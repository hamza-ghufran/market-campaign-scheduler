import { core } from 'utils/axios'
import { getAction } from 'utils/api'
import {
	listCampaignAction,
} from 'actions/actions';

export function listCampaign(reqObj) {
	return dispatch => {
		let action = getAction(dispatch, listCampaignAction);
		action.req();
		return core.post(
			`/campaign/list`,
			reqObj
		)
			.then(action.res)
			.catch(action.err)
	}
}