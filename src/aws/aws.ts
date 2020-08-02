import {S3} from '../aws';

export const uploadObjectToS3 = async (object: any, bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: JSON.stringify(object)
    };
    return S3.putObject(params).promise();
};
