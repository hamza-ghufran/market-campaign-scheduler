import axios from 'axios';
import { apiConfig } from '../variables';

function handleStatus(status) {
    return status == 200;
}

export const core = axios.create({
    baseURL: apiConfig.core.baseUrl,
    timeout: apiConfig.core.timeout,
    headers: apiConfig.core.headers,
    validateStatus: function (status) {
        return handleStatus(status)
    },
})