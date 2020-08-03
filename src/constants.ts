export const SPORT_MAP = {
    mlb: 'baseball',
    nfl: 'football',
    nba: 'basketball',
    nhl: 'hockey'
};
export const NUMBER_OF_GAMES_FOR_ROLLING_AVG = 5;

//MLB
export const SINGLE_MULTIPLIER = 3;
export const FD_DOUBLE_MULTIPLIER = 6;
export const DK_DOUBLE_MULTIPLIER = 5;
export const FD_TRIPLE_MULTIPLIER = 9;
export const DK_TRIPLE_MULTIPLIER = 8;
export const FD_HR_MULTIPLIER = 12;
export const DK_HR_MULTIPLIER = 10;
export const FD_RBI_MULTIPLIER = 3.5;
export const DK_RBI_MULTIPLIER = 2;
export const FD_RUN_MULTIPLIER = 3.2;
export const DK_RUN_MULTIPLIER = 2;
export const FD_WALK_MULTIPLIER = 3;
export const DK_WALK_MULTIPLIER = 2;
export const FD_SB_MULTIPLIER = 6;
export const DK_SB_MULTIPLIER = 5;
export const FD_HBP_MULTIPLIER = 3;
export const DK_HBP_MULTIPLIER = 2;
export const FD_PITCHER_WIN_BONUS = 6;
export const DK_PITCHER_WIN_BONUS = 4;
export const QUALITY_START_BONUS = 4;
export const FD_ER_MULTIPLIER = -3;
export const DK_ER_MULTIPLIER = -2;
export const FD_STRIKEOUT_MULTIPLIER = 3;
export const DK_STRIKEOUT_MULTIPLIER = 2;
export const FD_IP_MULTIPLIER = 3;
export const DK_IP_MULTIPLIER = 2.25;
export const HIT_AGAINST_MULTIPLIER = -0.6;
export const WALK_AGAINST_MULTIPLIER = -0.6;
export const HIT_BATSMAN_MULTIPLIER = -0.6;
export const COMPLETE_GAME_BONUS = 2.5;
export const COMPLETE_GAME_SHUTOUT_BONUS = 2.5;
export const NO_HITTER_BONUS = 5;

// NFL
export const RUSH_YDS_MULTIPLIER = 0.1;
export const RUSH_TD_MULTIPLIER = 6;
export const FD_FUMBLES_LOST_MULTIPLIER = -2;
export const DK_FUMBLES_LOST_MULTIPLIER = -1;
export const PASS_YDS_MULTIPLIER = 0.04;
export const PASS_TD_MULTIPLIER = 4;
export const REC_YDS_MULTIPLIER = 0.1;
export const REC_TD_MULTIPLIER = 6;
export const FD_REC_MULTIPLIER = 0.5;
export const DK_REC_MULTIPLIER = 1;
export const INT_MULTIPLIER = -1;
export const RETURN_TD_MULTIPLIER = 6;
export const TWO_POINT_CONVERSION_MULTIPLIER = 2;
export const SACKS_MULTIPLIER = 1;
export const DEFENSE_INT_MULTIPLIER = 2;
export const FUMBLE_RECOVERIES_MULTIPLIER = 2;
export const DEFENSE_TOUCHDOWNS_MULTIPLIER = 6;
export const SAFETIES_MULTIPLIER = 2;
export const YARDS_BONUS = 3;
export const POINTS_ALLOWED_RANGES = [
    [-1, 0],
    [1, 6],
    [7, 13],
    [14, 20],
    [21, 27],
    [28, 34],
    [35, 1000]
];
export const ZERO_POINTS_ALLOWED = 10;
export const ONE_TO_SIX_POINTS_ALLOWED = 7;
export const SEVEN_TO_THIRTEEN_POINTS_ALLOWED = 4;
export const FOURTEEN_TO_TWENTY_POINTS_ALLOWED = 1;
export const TWENTY_ONE_TO_TWENTY_SEVEN_POINTS_ALLOWED = 0;
export const TWENTY_EIGHT_TO_THIRTY_FOUR_POINTS_ALLOWED = -1;
export const MORE_THAN_34_POINTS_ALLOWED = -4;
export const POINTS_ALLOWED_ARRAY = [
    ZERO_POINTS_ALLOWED,
    ONE_TO_SIX_POINTS_ALLOWED,
    SEVEN_TO_THIRTEEN_POINTS_ALLOWED,
    FOURTEEN_TO_TWENTY_POINTS_ALLOWED,
    TWENTY_ONE_TO_TWENTY_SEVEN_POINTS_ALLOWED,
    TWENTY_EIGHT_TO_THIRTY_FOUR_POINTS_ALLOWED,
    MORE_THAN_34_POINTS_ALLOWED
];

//NBA
export const FD_THREE_PT_MULTIPLIER = 3;
export const DK_THREE_PT_MULTIPLIER = 0.5;
export const TWO_PT_MULTIPLIER = 2;
export const FREE_THROW_MULTIPLIER = 1;
export const FD_REBOUND_MULTIPLIER = 1.2;
export const DK_REBOUND_MULTIPLIER = 1.25;
export const ASSIST_MULTIPLIER = 1.5;
export const FD_BLOCK_MULTIPLIER = 3;
export const DK_BLOCK_MULTIPLIER = 2;
export const FD_STEAL_MULTIPLIER = 3;
export const DK_STEAL_MULTIPLIER = 2;
export const FD_TURNOVER_MULTIPLIER = -1;
export const DK_TURNOVER_MULTIPLIER = -0.5;
export const DOUBLE_DOUBLE_BONUS = 1.5;
export const TRIPLE_DOUBLE_BONUS = 3;

//NHL
export const FD_GOALIE_WIN_POINTS = 12;
export const DK_GOALIE_WIN_POINTS = 6;
export const FD_GOALIE_SHUTOUT_BONUS = 8;
export const DK_GOALIE_SHUTOUT_BONUS = 4;
export const FD_GOALIE_SAVE_MULTIPLIER = 0.8;
export const DK_GOALIE_SAVE_MULTIPLIER = 0.7;
export const FD_GOALS_AGAINST_MULTIPLIER = -4;
export const DK_GOALS_AGAINST_MULTIPLIER = -3.5;
export const OVERTIME_LOSS_BONUS = 2;
export const GOALIE_SAVE_BONUS = 3;
export const FD_GOAL_MULTIPLIER = 12;
export const DK_GOAL_MULTIPLIER = 8.5;
export const FD_ASSIST_MULTIPLIER = 8;
export const DK_ASSIST_MULTIPLIER = 5;
export const FD_SHOT_MULTIPLIER = 1.6;
export const DK_SHOT_MULTIPLIER = 1.5;
export const FD_BLOCKED_SHOTS_MULTIPLIER = 1.6;
export const DK_BLOCKED_SHOTS_MULTIPLIER = 1.3;
export const SHORT_HANDED_MULTIPLIER = 2;
export const POWER_PLAY_MULTIPLIER = 0.5;
export const SHOOTOUT_GOAL_MULTIPLIER = 1.5;
export const HAT_TRICK_BONUS = 3;
export const SHOT_BONUS = 3;
export const BLOCK_BONUS = 3;
export const GOALS_AND_ASSIST_BONUS = 3;

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));