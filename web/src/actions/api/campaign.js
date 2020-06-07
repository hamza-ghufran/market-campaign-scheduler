import { core } from 'utils/axios'
import { getAction } from 'utils/api'
import {
	listCampaignAction,
	updateCampaignAction
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

export function addCampaign(reqObj) {
	return dispatch => {
		let action = getAction(dispatch, updateCampaignAction);
		action.req();
		return core.post(
			`/campaign/add`,
			reqObj
		)
			.then(action.res)
			.catch(action.err)
	}
}