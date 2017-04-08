

import axios from 'axios';

import { GETLOG } from './types';

export function logRequest(logData) {
    return dispatch => {
        return axios.get('/api/report/getlog', logData).then(res => {
            const logList = res.data.result;
            dispatch({
                type:GETLOG,
                logList
            });

        });
    }
}
