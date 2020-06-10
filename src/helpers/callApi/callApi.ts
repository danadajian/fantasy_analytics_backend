import {getSignature} from "../getSignature/getSignature";
import fetch from 'node-fetch';

export const callApi = async (baseCall: string, params: string) => {
    const signature = getSignature(process.env.API_KEY, process.env.API_SECRET);
    const url = `http://api.stats.com/v1/${baseCall}?accept=json${params}&api_key=${process.env.API_KEY}&sig=${signature}`;
    return fetch(url)
        .then(response => response.json())
        .catch((error: Error) => error)
};