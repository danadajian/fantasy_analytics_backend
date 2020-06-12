import {
    DEFENSE_INT_MULTIPLIER, DEFENSE_TOUCHDOWNS_MULTIPLIER, DK_FUMBLES_LOST_MULTIPLIER, DK_REC_MULTIPLIER,
    FD_FUMBLES_LOST_MULTIPLIER, FD_REC_MULTIPLIER, FUMBLE_RECOVERIES_MULTIPLIER, INT_MULTIPLIER, PASS_TD_MULTIPLIER,
    PASS_YDS_MULTIPLIER, POINTS_ALLOWED_ARRAY, POINTS_ALLOWED_RANGES,REC_TD_MULTIPLIER, REC_YDS_MULTIPLIER,
    RETURN_TD_MULTIPLIER, RUSH_TD_MULTIPLIER, RUSH_YDS_MULTIPLIER, SACKS_MULTIPLIER, SAFETIES_MULTIPLIER,
    TWO_POINT_CONVERSION_MULTIPLIER, YARDS_BONUS,
} from "../../constants";
import {sum} from "../sum/sum";

export const calculateFanduelRushingPoints = (rushingStatObject) => {
    const {yards, touchdowns, fumblesLost} = rushingStatObject;
    return sum(yards * RUSH_YDS_MULTIPLIER,
        touchdowns * RUSH_TD_MULTIPLIER,
        fumblesLost * FD_FUMBLES_LOST_MULTIPLIER)
};

export const calculateDraftKingsRushingPoints = (rushingStatObject) => {
    const {yards, touchdowns, fumblesLost} = rushingStatObject;
    return sum(
        yards * RUSH_YDS_MULTIPLIER,
        touchdowns * RUSH_TD_MULTIPLIER,
        fumblesLost * DK_FUMBLES_LOST_MULTIPLIER,
        getYardsBonus(yards)
    )
};

export const calculateFanduelPassingPoints = (passingStat) => {
    const {yards, touchdowns, interceptions, fumblesLost} = passingStat;
    return sum(
        yards * PASS_YDS_MULTIPLIER,
        touchdowns * PASS_TD_MULTIPLIER,
        interceptions * INT_MULTIPLIER,
        fumblesLost * FD_FUMBLES_LOST_MULTIPLIER
    )
};

export const calculateDraftKingsPassingPoints = (passingStat) => {
    const {yards, touchdowns, interceptions, fumblesLost} = passingStat;
    return sum(
        yards * PASS_YDS_MULTIPLIER,
        touchdowns * PASS_TD_MULTIPLIER,
        interceptions * INT_MULTIPLIER,
        fumblesLost * DK_FUMBLES_LOST_MULTIPLIER,
        getYardsBonus(yards)
    )
};

export const calculateFanduelReceivingPoints = (receivingStatObject) => {
    const {yards, touchdowns, receptions, fumblesLost} = receivingStatObject;
    return sum(
        yards * REC_YDS_MULTIPLIER,
        touchdowns * REC_TD_MULTIPLIER,
        receptions * FD_REC_MULTIPLIER,
        fumblesLost * FD_FUMBLES_LOST_MULTIPLIER
    )
};

export const calculateDraftKingsReceivingPoints = (receivingStatObject) => {
    const {yards, touchdowns, receptions, fumblesLost} = receivingStatObject;
    return sum(
        yards * REC_YDS_MULTIPLIER,
        touchdowns * REC_TD_MULTIPLIER,
        receptions * DK_REC_MULTIPLIER,
        fumblesLost * DK_FUMBLES_LOST_MULTIPLIER,
        getYardsBonus(yards)
    )
};

export const calculateReturnPoints = (returnStatObject) => {
    const {touchdowns} = returnStatObject;
    return sum(touchdowns * RETURN_TD_MULTIPLIER)
};

export const calculateTwoPointConversionPoints = (twoPointConversionStatObject) => {
    const {twoPointConversions} = twoPointConversionStatObject;
    return sum(twoPointConversions * TWO_POINT_CONVERSION_MULTIPLIER)
};

export const calculateDefensePoints = (defenseStatObject) => {
    const {interceptions, fumbleRecoveries, sacks, safeties, touchdowns, pointsAllowed} = defenseStatObject;
    const pointsAllowedIndex = POINTS_ALLOWED_RANGES.findIndex(range => pointsAllowed > range[0] && pointsAllowed < range[1]);
    const pointsAllowedScore = POINTS_ALLOWED_ARRAY[pointsAllowedIndex];
    return sum(
        sacks * SACKS_MULTIPLIER,
        interceptions * DEFENSE_INT_MULTIPLIER,
        fumbleRecoveries * FUMBLE_RECOVERIES_MULTIPLIER,
        touchdowns * DEFENSE_TOUCHDOWNS_MULTIPLIER,
        safeties * SAFETIES_MULTIPLIER,
        pointsAllowedScore
    )
};

const getYardsBonus = (yards) => {
    return yards >= 100 ? YARDS_BONUS : 0;
};
