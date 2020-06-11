import {getEventIds} from "../helpers/getEventIds/getEventIds";
import {getFantasyDataFromMLBGame} from "../helpers/getFantasyDataFromMLBGame/getFantasyDataFromMLBGame";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromNFLGame/getFantasyDataFromNFLGame";
import {getFantasyDataFromNBAGame} from "../helpers/getFantasyDataFromNBAGame/getFantasyDataFromNBAGame";
import * as _ from 'lodash'
import * as Bluebird from 'bluebird'

export const getFantasyData = async (event: any) => {
    const {sport, season, date, week} = event;
    return getEventIds(sport, season, date, week)
        .then(eventIds => {
            return Bluebird.map(eventIds, eventId => {
                if (sport === 'mlb')
                    return getFantasyDataFromMLBGame(eventId)
                if (sport === 'nfl')
                    return getFantasyDataFromNFLGame(eventId)
                if (sport === 'nba')
                    return getFantasyDataFromNBAGame(eventId)
            })
        })
        .then(fantasyData => {
            return _.flatten(fantasyData)
        })
};
