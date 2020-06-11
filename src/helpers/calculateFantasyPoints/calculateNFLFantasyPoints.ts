import {
    DEFENSE_INT_MULTIPLIER, DEFENSE_TOUCHDOWNS_MULTIPLIER,
    DK_FUMBLES_LOST_MULTIPLIER,
    DK_REC_MULTIPLIER,
    FD_FUMBLES_LOST_MULTIPLIER,
    FD_REC_MULTIPLIER, FUMBLE_RECOVERIES_MULTIPLIER,
    INT_MULTIPLIER,
    PASS_TD_MULTIPLIER,
    PASS_YDS_MULTIPLIER,
    REC_TD_MULTIPLIER, REC_YDS_MULTIPLIER, RETURN_TD_MULTIPLIER,
    RUSH_TD_MULTIPLIER,
    RUSH_YDS_MULTIPLIER, SACKS_MULTIPLIER, SAFETIES_MULTIPLIER, TWO_POINT_CONVERSION_MULTIPLIER
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
        getDraftKingsBonus(yards)
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
        getDraftKingsBonus(yards)
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
        getDraftKingsBonus(yards)
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
    return sum(
        sacks * SACKS_MULTIPLIER,
        interceptions * DEFENSE_INT_MULTIPLIER,
        fumbleRecoveries * FUMBLE_RECOVERIES_MULTIPLIER,
        touchdowns * DEFENSE_TOUCHDOWNS_MULTIPLIER,
        safeties * SAFETIES_MULTIPLIER,
        getPointsAllowedScore(pointsAllowed)
    )
};

const getDraftKingsBonus = (yards) => {
    return yards >= 100 ? 3 : 0;
};

const getPointsAllowedScore = (pointsAllowed) => {
    if (pointsAllowed > 34)
        return -4;
    else if (pointsAllowed > 27)
        return -1;
    else if (pointsAllowed > 20)
        return 0;
    else if (pointsAllowed > 13)
        return 1;
    else if (pointsAllowed > 6)
        return 4;
    else if (pointsAllowed > 0)
        return 7;
    else
        return 10;
};
