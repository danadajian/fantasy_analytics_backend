import {sum} from "../sum/sum";
import {
    BLOCK_BONUS, DK_ASSIST_MULTIPLIER, DK_BLOCKED_SHOTS_MULTIPLIER, DK_GOAL_MULTIPLIER, DK_GOALIE_SAVE_MULTIPLIER,
    DK_GOALIE_SHUTOUT_BONUS, DK_GOALIE_WIN_POINTS, DK_GOALS_AGAINST_MULTIPLIER, DK_SHOT_MULTIPLIER,
    FD_ASSIST_MULTIPLIER, FD_BLOCKED_SHOTS_MULTIPLIER, FD_GOAL_MULTIPLIER, FD_GOALIE_SAVE_MULTIPLIER,
    FD_GOALIE_SHUTOUT_BONUS, FD_GOALIE_WIN_POINTS, FD_GOALS_AGAINST_MULTIPLIER, FD_SHOT_MULTIPLIER, GOALIE_SAVE_BONUS,
    GOALS_AND_ASSIST_BONUS, HAT_TRICK_BONUS, OVERTIME_LOSS_BONUS, POWER_PLAY_MULTIPLIER, SHOOTOUT_GOAL_MULTIPLIER,
    SHORT_HANDED_MULTIPLIER, SHOT_BONUS
} from "../../constants";

export const calculateFanduelGoaliePoints = (statObject) => {
    const {goalsAgainst, isShutout, isWinningGoaltender, saves} = statObject;
    return sum(
        isWinningGoaltender ? FD_GOALIE_WIN_POINTS : 0,
        goalsAgainst.totalAgainst * FD_GOALS_AGAINST_MULTIPLIER,
        saves * FD_GOALIE_SAVE_MULTIPLIER,
        isShutout ? FD_GOALIE_SHUTOUT_BONUS : 0
    )
};

export const calculateDraftKingsGoaliePoints = (statObject) => {
    const {goalsAgainst, isOTLossGoaltender, isShutout, isWinningGoaltender, saves} = statObject;
    return sum(
        isWinningGoaltender ? DK_GOALIE_WIN_POINTS : 0,
        goalsAgainst.totalAgainst * DK_GOALS_AGAINST_MULTIPLIER,
        saves * DK_GOALIE_SAVE_MULTIPLIER,
        isShutout ? DK_GOALIE_SHUTOUT_BONUS : 0,
        isOTLossGoaltender ? OVERTIME_LOSS_BONUS : 0,
        saves >= 35 ? GOALIE_SAVE_BONUS : 0
    )
};

export const calculateFanduelSkaterPoints = (statObject) => {
    const {assists, blocks, goals, shotsOnGoal} = statObject;
    return sum(
        goals.total * FD_GOAL_MULTIPLIER,
        assists.total * FD_ASSIST_MULTIPLIER,
        shotsOnGoal * FD_SHOT_MULTIPLIER,
        goals.shortHanded * SHORT_HANDED_MULTIPLIER,
        goals.powerPlay * POWER_PLAY_MULTIPLIER,
        assists.shortHanded * SHORT_HANDED_MULTIPLIER,
        assists.powerPlay * POWER_PLAY_MULTIPLIER,
        blocks * FD_BLOCKED_SHOTS_MULTIPLIER
    )
};

export const calculateDraftKingsSkaterPoints = (statObject) => {
    const {assists, blocks, goals, shootout, shotsOnGoal} = statObject;
    return sum(
        goals.total * DK_GOAL_MULTIPLIER,
        assists.total * DK_ASSIST_MULTIPLIER,
        shotsOnGoal * DK_SHOT_MULTIPLIER,
        goals.shortHanded * SHORT_HANDED_MULTIPLIER,
        assists.shortHanded * SHORT_HANDED_MULTIPLIER,
        blocks * DK_BLOCKED_SHOTS_MULTIPLIER,
        shootout.goals * SHOOTOUT_GOAL_MULTIPLIER,
        goals.total >= 3 ? HAT_TRICK_BONUS : 0,
        shotsOnGoal >= 5 ? SHOT_BONUS : 0,
        blocks >= 3 ? BLOCK_BONUS : 0,
        goals.total + assists.total >= 3 ? GOALS_AND_ASSIST_BONUS : 0
    )
};