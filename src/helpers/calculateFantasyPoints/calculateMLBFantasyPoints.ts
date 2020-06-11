import {sum} from "../sum/sum";
import {
    COMPLETE_GAME_POINTS, COMPLETE_GAME_SHUTOUT_POINTS, DK_DOUBLE_MULTIPLIER, DK_ER_MULTIPLIER, DK_HBP_MULTIPLIER,
    DK_HR_MULTIPLIER, DK_IP_MULTIPLIER, DK_RBI_MULTIPLIER, DK_RUN_MULTIPLIER, DK_SB_MULTIPLIER, DK_STRIKEOUT_MULTIPLIER,
    DK_TRIPLE_MULTIPLIER, DK_WALK_MULTIPLIER, DK_WIN_POINTS, FD_DOUBLE_MULTIPLIER, FD_ER_MULTIPLIER, FD_HBP_MULTIPLIER,
    FD_HR_MULTIPLIER, FD_IP_MULTIPLIER, FD_RBI_MULTIPLIER, FD_RUN_MULTIPLIER, FD_SB_MULTIPLIER, FD_STRIKEOUT_MULTIPLIER,
    FD_TRIPLE_MULTIPLIER, FD_WALK_MULTIPLIER, FD_WIN_POINTS, HIT_AGAINST_MULTIPLIER, HIT_BATSMAN_MULTIPLIER,
    NO_HITTER_POINTS, QUALITY_START_POINTS, SINGLE_MULTIPLIER, WALK_AGAINST_MULTIPLIER
} from "../../constants";

export const calculateFanduelBattingPoints = (battingStatObject) => {
    const {doubles, hitByPitch, hits, homeRuns, runs, runsBattedIn, stolenBases, triples, walks} = battingStatObject;
    return sum(
        (hits.game - doubles.game - triples.game - homeRuns.game) * SINGLE_MULTIPLIER,
        doubles.game * FD_DOUBLE_MULTIPLIER,
        triples.game * FD_TRIPLE_MULTIPLIER,
        homeRuns.game * FD_HR_MULTIPLIER,
        runsBattedIn.game * FD_RBI_MULTIPLIER,
        runs.game * FD_RUN_MULTIPLIER,
        walks.game * FD_WALK_MULTIPLIER,
        stolenBases.game * FD_SB_MULTIPLIER,
        hitByPitch.game * FD_HBP_MULTIPLIER
    )
};

export const calculateDraftKingsBattingPoints = (battingStatObject) => {
    const {doubles, hitByPitch, hits, homeRuns, runs, runsBattedIn, stolenBases, triples, walks} = battingStatObject;
    return sum(
        (hits.game - doubles.game - triples.game - homeRuns.game) * SINGLE_MULTIPLIER,
        doubles.game * DK_DOUBLE_MULTIPLIER,
        triples.game * DK_TRIPLE_MULTIPLIER,
        homeRuns.game * DK_HR_MULTIPLIER,
        runsBattedIn.game * DK_RBI_MULTIPLIER,
        runs.game * DK_RUN_MULTIPLIER,
        walks.game * DK_WALK_MULTIPLIER,
        stolenBases.game * DK_SB_MULTIPLIER,
        hitByPitch.game * DK_HBP_MULTIPLIER
    )
};

export const calculateFanduelPitchingPoints = (pitchingStatObject, pitchingStarterObject) => {
    const isStartingPitcher = pitchingStarterObject && pitchingStarterObject.player.playerId === pitchingStatObject.player.playerId;
    let {earnedRuns, inningsPitched, isWinningPitcher, strikeouts} = pitchingStatObject;
    const ipArray = Number(inningsPitched.game).toFixed(1).split('.');
    inningsPitched = Number(ipArray[0]) + Number(ipArray[1]) / 3;
    return sum(
        isWinningPitcher ? FD_WIN_POINTS : 0,
        isStartingPitcher && inningsPitched >=6 && earnedRuns.game <=3 ? QUALITY_START_POINTS : 0,
        earnedRuns.game * FD_ER_MULTIPLIER,
        strikeouts.game * FD_STRIKEOUT_MULTIPLIER,
        inningsPitched * FD_IP_MULTIPLIER
    )
};

export const calculateDraftKingsPitchingPoints = (pitchingStatObject) => {
    let {earnedRuns, hitBatsmen, hits, inningsPitched, isCompleteGame, isNoHitter, isShutout, isWinningPitcher, strikeouts, walks} = pitchingStatObject;
    const ipArray = Number(inningsPitched.game).toFixed(1).split('.');
    inningsPitched = Number(ipArray[0]) + Number(ipArray[1]) / 3;
    return sum(
        inningsPitched * DK_IP_MULTIPLIER,
        strikeouts.game * DK_STRIKEOUT_MULTIPLIER,
        isWinningPitcher ? DK_WIN_POINTS : 0,
        earnedRuns.game * DK_ER_MULTIPLIER,
        hits.game * HIT_AGAINST_MULTIPLIER,
        walks.game * WALK_AGAINST_MULTIPLIER,
        hitBatsmen.game * HIT_BATSMAN_MULTIPLIER,
        isCompleteGame ? COMPLETE_GAME_POINTS : 0,
        isCompleteGame && isShutout ? COMPLETE_GAME_SHUTOUT_POINTS : 0,
        isNoHitter ? NO_HITTER_POINTS : 0
    )
};
