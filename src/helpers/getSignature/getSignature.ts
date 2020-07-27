import {createHash} from 'crypto';

export const getSignature = (key: string, secret: string): string => {
    const combo = `${key}${secret}${Math.floor(new Date().getTime()/1000)}`;
    return createHash('sha256')
        .update(combo, 'utf8')
        .digest('hex');
};