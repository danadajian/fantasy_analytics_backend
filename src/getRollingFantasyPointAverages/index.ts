import {getCurrentData} from "../getCurrentData";
import {getFantasyData} from "../getFantasyData";
import {groupAndCalculateAverages} from "./groupAndCalculateAverages";
import * as Bluebird from "bluebird";
import {FantasyData} from "../index";

export const getRollingFantasyPointAverages = async (event): Promise<FantasyData[]> => {
    const {site, sport} = event;
    return getCurrentData({sport})
        .then(currentData => {
            let {rollingDateStrings, rollingWeeks, currentSeason} = currentData;
            if (sport === 'nfl') {
                return Bluebird.map(rollingWeeks,
                        week => getFantasyData({sport, week, season: currentSeason}))
            } else {
                return Bluebird.map(rollingDateStrings,
                        date => getFantasyData({sport, date, season: currentSeason}))
            }
        })
        .then(allFantasyData => {
            return groupAndCalculateAverages(allFantasyData, site)
        })
};
