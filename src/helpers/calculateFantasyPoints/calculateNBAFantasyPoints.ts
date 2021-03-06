import * as _ from 'lodash';
import {
    ASSIST_MULTIPLIER, DK_BLOCK_MULTIPLIER, DK_REBOUND_MULTIPLIER, DK_STEAL_MULTIPLIER, DK_THREE_PT_MULTIPLIER,
    DK_TURNOVER_MULTIPLIER, DOUBLE_DOUBLE_BONUS, FD_BLOCK_MULTIPLIER, FD_REBOUND_MULTIPLIER, FD_STEAL_MULTIPLIER,
    FD_THREE_PT_MULTIPLIER, FD_TURNOVER_MULTIPLIER, FREE_THROW_MULTIPLIER, TRIPLE_DOUBLE_BONUS, TWO_PT_MULTIPLIER
} from "../../constants";

export const calculateFanduelPoints = (statObject): number => {
    const {assists, blockedShots, fieldGoals, freeThrows, rebounds, steals, threePointFieldGoals, turnovers} = statObject;
    return _.chain([
        threePointFieldGoals.made * FD_THREE_PT_MULTIPLIER,
        fieldGoals.made * TWO_PT_MULTIPLIER,
        freeThrows.made * FREE_THROW_MULTIPLIER,
        rebounds.total * FD_REBOUND_MULTIPLIER,
        assists * ASSIST_MULTIPLIER,
        blockedShots * FD_BLOCK_MULTIPLIER,
        steals * FD_STEAL_MULTIPLIER,
        turnovers * FD_TURNOVER_MULTIPLIER
    ]).sum().round(2).value()
};

export const calculateDraftKingsPoints = (statObject): number => {
    const {assists, blockedShots, points, rebounds, steals, threePointFieldGoals, turnovers} = statObject;
    const statArray = [points, rebounds.total, assists, blockedShots, steals].sort((a, b) => b - a);
    const isDoubleDouble = statArray.slice(0, 2).every(stat => stat >= 10);
    const isTripleDouble = statArray.slice(0, 3).every(stat => stat >= 10);
    return _.chain([
        points,
        threePointFieldGoals.made * DK_THREE_PT_MULTIPLIER,
        rebounds.total * DK_REBOUND_MULTIPLIER,
        assists * ASSIST_MULTIPLIER,
        blockedShots * DK_BLOCK_MULTIPLIER,
        steals * DK_STEAL_MULTIPLIER,
        turnovers * DK_TURNOVER_MULTIPLIER,
        isDoubleDouble && !isTripleDouble ? DOUBLE_DOUBLE_BONUS : 0,
        isTripleDouble ? TRIPLE_DOUBLE_BONUS : 0
    ]).sum().round(2).value()
};
