import * as _ from 'lodash';
import {
    DEFENSE_INT_MULTIPLIER, DEFENSE_TOUCHDOWNS_MULTIPLIER, DK_FUMBLES_LOST_MULTIPLIER, DK_REC_MULTIPLIER,
    FD_FUMBLES_LOST_MULTIPLIER, FD_REC_MULTIPLIER, FUMBLE_RECOVERIES_MULTIPLIER, INT_MULTIPLIER, PASS_TD_MULTIPLIER,
    PASS_YDS_MULTIPLIER, POINTS_ALLOWED_ARRAY, POINTS_ALLOWED_RANGES,REC_TD_MULTIPLIER, REC_YDS_MULTIPLIER,
    RETURN_TD_MULTIPLIER, RUSH_TD_MULTIPLIER, RUSH_YDS_MULTIPLIER, SACKS_MULTIPLIER, SAFETIES_MULTIPLIER,
    TWO_POINT_CONVERSION_MULTIPLIER, YARDS_BONUS,
} from "../../constants";

export const calculateFanduelRushingPoints = (rushingStatObject): number => {
    const {yards, touchdowns, fumblesLost} = rushingStatObject;
    return _.chain([
        yards * RUSH_YDS_MULTIPLIER,
        touchdowns * RUSH_TD_MULTIPLIER,
        fumblesLost * FD_FUMBLES_LOST_MULTIPLIER
    ]).sum().round(2).value()
};

export const calculateDraftKingsRushingPoints = (rushingStatObject): number => {
    const {yards, touchdowns, fumblesLost} = rushingStatObject;
    return _.chain([
        yards * RUSH_YDS_MULTIPLIER,
        touchdowns * RUSH_TD_MULTIPLIER,
        fumblesLost * DK_FUMBLES_LOST_MULTIPLIER,
        getYardsBonus(yards)
    ]).sum().round(2).value()
};

export const calculateFanduelPassingPoints = (passingStat): number => {
    const {yards, touchdowns, interceptions, fumblesLost} = passingStat;
    return _.chain([
        yards * PASS_YDS_MULTIPLIER,
        touchdowns * PASS_TD_MULTIPLIER,
        interceptions * INT_MULTIPLIER,
        fumblesLost * FD_FUMBLES_LOST_MULTIPLIER
    ]).sum().round(2).value()
};

export const calculateDraftKingsPassingPoints = (passingStat): number => {
    const {yards, touchdowns, interceptions, fumblesLost} = passingStat;
    return _.chain([
        yards * PASS_YDS_MULTIPLIER,
        touchdowns * PASS_TD_MULTIPLIER,
        interceptions * INT_MULTIPLIER,
        fumblesLost * DK_FUMBLES_LOST_MULTIPLIER,
        getYardsBonus(yards)
    ]).sum().round(2).value()
};

export const calculateFanduelReceivingPoints = (receivingStatObject): number => {
    const {yards, touchdowns, receptions, fumblesLost} = receivingStatObject;
    return _.chain([
        yards * REC_YDS_MULTIPLIER,
        touchdowns * REC_TD_MULTIPLIER,
        receptions * FD_REC_MULTIPLIER,
        fumblesLost * FD_FUMBLES_LOST_MULTIPLIER
    ]).sum().round(2).value()
};

export const calculateDraftKingsReceivingPoints = (receivingStatObject): number => {
    const {yards, touchdowns, receptions, fumblesLost} = receivingStatObject;
    return _.chain([
        yards * REC_YDS_MULTIPLIER,
        touchdowns * REC_TD_MULTIPLIER,
        receptions * DK_REC_MULTIPLIER,
        fumblesLost * DK_FUMBLES_LOST_MULTIPLIER,
        getYardsBonus(yards)
    ]).sum().round(2).value()
};

export const calculateReturnPoints = (returnStatObject): number => {
    const {touchdowns} = returnStatObject;
    return touchdowns * RETURN_TD_MULTIPLIER
};

export const calculateTwoPointConversionPoints = (twoPointConversionStatObject): number => {
    const {twoPointConversions} = twoPointConversionStatObject;
    return twoPointConversions * TWO_POINT_CONVERSION_MULTIPLIER
};

export const calculateDefensePoints = (defenseStatObject): number => {
    const {interceptions, fumbleRecoveries, sacks, safeties, touchdowns, pointsAllowed} = defenseStatObject;
    const pointsAllowedIndex = POINTS_ALLOWED_RANGES.findIndex(range => pointsAllowed > range[0] && pointsAllowed < range[1]);
    const pointsAllowedScore = POINTS_ALLOWED_ARRAY[pointsAllowedIndex];
    return _.chain([
        sacks * SACKS_MULTIPLIER,
        interceptions * DEFENSE_INT_MULTIPLIER,
        fumbleRecoveries * FUMBLE_RECOVERIES_MULTIPLIER,
        touchdowns * DEFENSE_TOUCHDOWNS_MULTIPLIER,
        safeties * SAFETIES_MULTIPLIER,
        pointsAllowedScore
    ]).sum().round(2).value()
};

const getYardsBonus = (yards) => {
    return yards >= 100 ? YARDS_BONUS : 0;
};
