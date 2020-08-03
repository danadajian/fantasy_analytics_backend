import {getEventIds} from "../helpers/getEventIds/getEventIds";
import {getFantasyDataFromMLBGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromMLBGame";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNFLGame";
import {getFantasyDataFromNBAGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNBAGame";
import {getFantasyDataFromNHLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNHLGame";
import * as _ from 'lodash'
import * as Bluebird from 'bluebird'
import {FantasyData, FantasyLambdaEvent} from "../index";

export const getFantasyData = async (event: FantasyLambdaEvent): Promise<FantasyData[]> => {
    const {sport, season, date, week} = event;
    return getEventIds(sport, season, date, week)
        .then((eventIds: number[]) => {
            return Bluebird.map(eventIds, eventId => fantasyDataFunctionMap[sport](eventId), {concurrency: 1})
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