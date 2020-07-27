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
        .then(eventIds => {
            if (sport === 'mlb')
                return Bluebird.map(eventIds, eventId => getFantasyDataFromMLBGame(eventId))
            if (sport === 'nfl')
                return Bluebird.map(eventIds, eventId => getFantasyDataFromNFLGame(eventId))
            if (sport === 'nba')
                return Bluebird.map(eventIds, eventId => getFantasyDataFromNBAGame(eventId))
            if (sport === 'nhl')
                return Bluebird.map(eventIds, eventId => getFantasyDataFromNHLGame(eventId))
        })
        .then(fantasyData => {
            return _.flatten(fantasyData)
        })
};
