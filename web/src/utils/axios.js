import axios from 'axios';
import { apiConfig } from '../variables';
import configureStore from 'store/configureStore';

function handleStatus(status) {
    let store = configureStore();
    
    return status == 200;
}

export const core = axios.create({
    baseURL: apiConfig.core.baseUrl,
    timeout: apiConfig.core.timeout,
    headers: apiConfig.core.headers,
    withCredentials: true,
    validateStatus: function (status) {
        return handleStatus(status)
    },
})