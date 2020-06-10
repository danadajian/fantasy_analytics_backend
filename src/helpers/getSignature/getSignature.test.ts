import {getSignature} from "./getSignature";
import {createHash} from 'crypto';

jest.mock('crypto');

// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => {
    return {
        getTime: jest.fn(() => 123001)
    }
});

const digest = jest.fn(() => 'signature');

const update = jest.fn(() => {
    return {
        digest
    }
});

(createHash as jest.Mock).mockReturnValue({
    update
});

describe('getSignature', () => {
    let result: any;
    const key = 'key';
    const secret = 'secret';

    beforeEach(() => {
        result = getSignature(key, secret);
    });

    it('should call createHash with correct params', () => {
        expect(createHash).toHaveBeenCalledWith('sha256')
    });

    it('should call createHash with correct params', () => {
        expect(update).toHaveBeenCalledWith('keysecret123', 'utf8')
    });

    it('should call createHash with correct params', () => {
        expect(digest).toHaveBeenCalledWith('hex')
    });

    it('should return expected result', () => {
        expect(result).toEqual('signature');
    });
});