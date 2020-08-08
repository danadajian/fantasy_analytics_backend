import {retrieveObjectFromS3, uploadObjectToS3,} from './aws';
import {S3} from '../aws';

jest.mock('../aws');

(S3.getObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn(() => {
            return {
                Body: Buffer.from(JSON.stringify({some: 'stuff'}))
            }
        })
    }
});

(S3.putObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

describe('aws', () => {
    describe('retrieves object', () => {
        let result: any;
        beforeEach(async () => {
            result = await retrieveObjectFromS3('bucket', 'file.json');
        });

        it('should call getObject with correct params', () => {
            const params = {
                Bucket: "bucket",
                Key: 'file.json'
            };
            expect(S3.getObject).toHaveBeenCalledWith(params)
        });

        it('should retrieve object', () => {
            expect(result).toEqual({some: 'stuff'});
        });
    });

    describe('uploads object', () => {
        let result: any;
        const playerPool = ['player1', 'player2', 'player3'];
        beforeEach(async () => {
            result = await uploadObjectToS3(playerPool, 'bucket', 'file.json')
        });

        it('should call putObject with correct params', () => {
            const params = {
                Bucket: "bucket",
                Key: 'file.json',
                Body: JSON.stringify(playerPool)
            };
            expect(S3.putObject).toHaveBeenCalledWith(params)
        });
    });
});
