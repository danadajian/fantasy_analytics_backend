import {getEventIds} from "../helpers/getEventIds/getEventIds";
import {getFantasyDataFromMLBGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromMLBGame";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNFLGame";
import {getFantasyDataFromNBAGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNBAGame";
import {getFantasyDataFromNHLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNHLGame";
import * as _ from 'lodash'
import * as Bluebird from 'bluebird'
import {FantasyLambdaEvent} from "../types";
import {getSignature} from "../helpers/getSignature/getSignature";
import {API_DELAY_MS, delay, logger} from "../constants";
import {FantasyData} from "@dadajian/shared-fantasy-constants";

export const getFantasyData = async (event: FantasyLambdaEvent): Promise<FantasyData[]> => {
    const {sport, season, date, week} = event;
    return getEventIds(sport, season, date, week)
        .then((eventIds: number[]) => {
            logger.info(`Found eventIds for ${sport}: ${eventIds}`);
            const signature = getSignature(process.env.API_KEY, process.env.API_SECRET);
            return Bluebird.map(eventIds, (eventId: number) => {
                logger.info(`Getting data for eventId: ${eventId}`);
                return delay(API_DELAY_MS)
                    .then(() => fantasyDataFunctionMap[sport](eventId, signature));
            }, {concurrency: 1})
        })
        .then(fantasyData => {
            return _.flatten(fantasyData)
        })
};

const fantasyDataFunctionMap = {
    mlb: getFantasyDataFromMLBGame,
    nfl: getFantasyDataFromNFLGame,
    nba: getFantasyDataFromNBAGame,
    nhl: getFantasyDataFromNHLGame
}