import {getNflEventIds} from "../helpers/getNflEventIds/getNflEventIds";
import {getFantasyDataFromNflGame} from "../helpers/getFantasyDataFromNflGame/getFantasyDataFromNflGame";
import * as _ from 'lodash'
import * as Bluebird from 'bluebird'

export const getFantasyData = async (event: any) => {
    const {sport, week, season} = event;
    return getNflEventIds(week, season)
        .then(eventIds => {
            return Bluebird.map(eventIds, eventId => getFantasyDataFromNflGame(eventId))
        })
        .then(fantasyData => {
            return _.flatten(fantasyData)
        })
};