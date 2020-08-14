import * as _ from 'lodash';
import {
    COMPLETE_GAME_BONUS, COMPLETE_GAME_SHUTOUT_BONUS, DK_DOUBLE_MULTIPLIER, DK_ER_MULTIPLIER, DK_HBP_MULTIPLIER,
    DK_HR_MULTIPLIER, DK_IP_MULTIPLIER, DK_RBI_MULTIPLIER, DK_RUN_MULTIPLIER, DK_SB_MULTIPLIER, DK_STRIKEOUT_MULTIPLIER,
    DK_TRIPLE_MULTIPLIER, DK_WALK_MULTIPLIER, DK_PITCHER_WIN_BONUS, FD_DOUBLE_MULTIPLIER, FD_ER_MULTIPLIER, FD_HBP_MULTIPLIER,
    FD_HR_MULTIPLIER, FD_IP_MULTIPLIER, FD_RBI_MULTIPLIER, FD_RUN_MULTIPLIER, FD_SB_MULTIPLIER, FD_STRIKEOUT_MULTIPLIER,
    FD_TRIPLE_MULTIPLIER, FD_WALK_MULTIPLIER, FD_PITCHER_WIN_BONUS, HIT_AGAINST_MULTIPLIER, HIT_BATSMAN_MULTIPLIER,
    NO_HITTER_BONUS, QUALITY_START_BONUS, SINGLE_MULTIPLIER, WALK_AGAINST_MULTIPLIER
} from "../../constants";

export const calculateFanduelBattingPoints = (battingStatObject): number => {
    const {doubles, hitByPitch, hits, homeRuns, runs, runsBattedIn, stolenBases, triples, walks} = battingStatObject;
    return _.chain([
        (hits.game - doubles.game - triples.game - homeRuns.game) * SINGLE_MULTIPLIER,
        doubles.game * FD_DOUBLE_MULTIPLIER,
        triples.game * FD_TRIPLE_MULTIPLIER,
        homeRuns.game * FD_HR_MULTIPLIER,
        runsBattedIn.game * FD_RBI_MULTIPLIER,
        runs.game * FD_RUN_MULTIPLIER,
        walks.game * FD_WALK_MULTIPLIER,
        stolenBases.game * FD_SB_MULTIPLIER,
        hitByPitch.game * FD_HBP_MULTIPLIER
    ]).sum().round(2).value()
};

export const calculateDraftKingsBattingPoints = (battingStatObject): number => {
    const {doubles, hitByPitch, hits, homeRuns, runs, runsBattedIn, stolenBases, triples, walks} = battingStatObject;
    return _.chain([
        (hits.game - doubles.game - triples.game - homeRuns.game) * SINGLE_MULTIPLIER,
        doubles.game * DK_DOUBLE_MULTIPLIER,
        triples.game * DK_TRIPLE_MULTIPLIER,
        homeRuns.game * DK_HR_MULTIPLIER,
        runsBattedIn.game * DK_RBI_MULTIPLIER,
        runs.game * DK_RUN_MULTIPLIER,
        walks.game * DK_WALK_MULTIPLIER,
        stolenBases.game * DK_SB_MULTIPLIER,
        hitByPitch.game * DK_HBP_MULTIPLIER
    ]).sum().round(2).value()
};

export const calculateFanduelPitchingPoints = (pitchingStatObject, pitchingStarterObject): number => {
    const isStartingPitcher = pitchingStarterObject && pitchingStarterObject.player.playerId === pitchingStatObject.player.playerId;
    let {earnedRuns, inningsPitched, isWinningPitcher, strikeouts} = pitchingStatObject;
    const ipArray = Number(inningsPitched.game).toFixed(1).split('.');
    inningsPitched = Number(ipArray[0]) + Number(ipArray[1]) / 3;
    return _.chain([
        isWinningPitcher ? FD_PITCHER_WIN_BONUS : 0,
        isStartingPitcher && inningsPitched >=6 && earnedRuns.game <=3 ? QUALITY_START_BONUS : 0,
        earnedRuns.game * FD_ER_MULTIPLIER,
        strikeouts.game * FD_STRIKEOUT_MULTIPLIER,
        inningsPitched * FD_IP_MULTIPLIER
    ]).sum().round(2).value()
};

export const calculateDraftKingsPitchingPoints = (pitchingStatObject): number => {
    let {earnedRuns, hitBatsmen, hits, inningsPitched, isCompleteGame, isNoHitter, isShutout, isWinningPitcher, strikeouts, walks} = pitchingStatObject;
    const ipArray = Number(inningsPitched.game).toFixed(1).split('.');
    inningsPitched = Number(ipArray[0]) + Number(ipArray[1]) / 3;
    return _.chain([
        inningsPitched * DK_IP_MULTIPLIER,
        strikeouts.game * DK_STRIKEOUT_MULTIPLIER,
        isWinningPitcher ? DK_PITCHER_WIN_BONUS : 0,
        earnedRuns.game * DK_ER_MULTIPLIER,
        hits.game * HIT_AGAINST_MULTIPLIER,
        walks.game * WALK_AGAINST_MULTIPLIER,
        hitBatsmen.game * HIT_BATSMAN_MULTIPLIER,
        isCompleteGame ? COMPLETE_GAME_BONUS : 0,
        isCompleteGame && isShutout ? COMPLETE_GAME_SHUTOUT_BONUS : 0,
        isNoHitter ? NO_HITTER_BONUS : 0
    ]).sum().round(2).value()
};
