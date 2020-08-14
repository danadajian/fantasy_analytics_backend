import {FantasyData} from "../types";
import * as Bluebird from "bluebird";
import * as _ from 'lodash';

export const getFantasyDataWithPercentiles = async (fantasyData: FantasyData[], playerPool: any[]): Promise<any[]> => {
    const sortedFantasyData = _.sortBy(fantasyData, 'Fanduel');
    return Bluebird.map(fantasyData, (playerData: FantasyData) => {
        const actual = playerData.Fanduel;
        const playerPosition = playerPool.find(player => player.playerId === playerData.playerId).position;
        const playerIdsWithMatchingPositions = playerPool
            .filter(player => player.position === playerPosition)
            .map(player => player.playerId);
        const sortedFilteredPoints = sortedFantasyData
            .filter((player: FantasyData) => playerIdsWithMatchingPositions.includes(player.playerId))
            .map((playerData: FantasyData) => playerData.Fanduel);
        const sortedPoints = sortedFantasyData.map((playerData: FantasyData) => playerData.Fanduel);
        const positionRank = sortedFilteredPoints.indexOf(actual) + 1;
        const overallRank = sortedPoints.indexOf(actual) + 1;
        return {
            ...playerData,
            positionPercentile: positionRank / sortedFilteredPoints.length * 100,
            overallPercentile: overallRank / sortedPoints.length * 100
        }
    })
}