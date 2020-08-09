import * as moment from "moment-timezone";

export const getPastDateString = (days: number) => {
    return moment().tz('America/New_York').subtract(days, 'days').format('YYYY-MM-DD');
}