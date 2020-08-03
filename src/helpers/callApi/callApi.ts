import {getSignature} from "../getSignature/getSignature";
import fetch from 'node-fetch';
import '../../env';

export const callApi = async (baseCall: string, params: string,
                              signature: string = getSignature(process.env.API_KEY, process.env.API_SECRET)): Promise<any> => {
    const url = `http://api.stats.com/v1/${baseCall}?accept=json${params}&api_key=${process.env.API_KEY}&sig=${signature}`;
    return fetch(url)
        .then(response => response.json())
        .catch((error: Error) => {
            console.log(error)
            return error
        })
};