import {callApi} from "./callApi";
import {getSignature} from "../getSignature/getSignature";
import fetch from 'node-fetch';

jest.mock('../getSignature/getSignature');
jest.mock('node-fetch');

(getSignature as jest.Mock).mockReturnValue('signature');

(fetch as unknown as jest.Mock).mockResolvedValue({
    json: () => 'json result'
});

describe('callApi', () => {
    let result: any;
    const baseCall = 'baseCall';
    const params = 'params';

    beforeEach(async () => {
        result = await callApi(baseCall, params);
    });

    it('should call fetch with correct url', () => {
        expect(fetch).toHaveBeenCalledWith(`http://api.stats.com/v1/${baseCall}?accept=json${params}&api_key=${process.env.API_KEY}&sig=signature`);
    });

    it('should return expected result', () => {
        expect(result).toEqual('json result')
    });
});