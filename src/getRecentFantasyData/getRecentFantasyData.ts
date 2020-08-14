import {getFantasyData} from "../getFantasyData";
import {getCurrentWeek} from "../helpers/getCurrentWeek/getCurrentWeek";
import {FantasyData} from "../types";
import {getPastDateString} from "../helpers/getPastDateString/getPastDateString";

export const getRecentFantasyData = async (sport: string): Promise<any> => {
    if (sport === 'nfl') {
        return getCurrentWeek(sport)
            .then((week: number) => {
                return Promise.all([
                    week - 1,
                    getFantasyData({
                        sport,
                        week: week - 1
                    })
                ])
            }).then(([week, fantasyData]) => {
                return [
                    {
                        week,
                        fantasyData
                    }
                ]
            })
    } else {
        const date = getPastDateString(1);
        return getFantasyData({
            sport,
            date
        }).then((fantasyData: FantasyData[]) => {
            return [
                {
                    date,
                    fantasyData
                }
            ]
        })
    }
}