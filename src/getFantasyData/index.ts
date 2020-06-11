import {getEventIdsByWeek} from "../helpers/getEventIdsByWeek/getEventIdsByWeek";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromNflGame/getFantasyDataFromNFLGame";
import * as _ from 'lodash'
import * as Bluebird from 'bluebird'

export const getFantasyData = async (event: any) => {
    const {sport, week, season} = event;
    return getEventIdsByWeek(week, season)
        .then(eventIds => {
            return Bluebird.map(eventIds, eventId => getFantasyDataFromNFLGame(eventId))
        })
        .then(fantasyData => {
            return _.flatten(fantasyData)
        })
};