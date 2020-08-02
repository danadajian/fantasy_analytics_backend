import * as AWS from 'aws-sdk';
import './env'

AWS.config.credentials = new AWS.Credentials(process.env.AWS_KEY, process.env.AWS_SECRET);
export const S3 = new AWS.S3({region: 'us-east-2'});
