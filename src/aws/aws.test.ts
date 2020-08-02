import {uploadObjectToS3,} from './aws';
import {S3} from '../aws';

jest.mock('../aws');

(S3.putObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn()
    }
});

describe('aws', () => {
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
