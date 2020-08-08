import {getFantasyData} from "../getFantasyData";
import {getCurrentWeek} from "../helpers/getCurrentWeek/getCurrentWeek";

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
        const today = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
        today.setDate(today.getDate() - 1);
        const date = today.toISOString().slice(0, 10);
        return Promise.all([
            date,
            getFantasyData({
                sport,
                date
            })
        ]).then(([date, fantasyData]) => {
            return [
                {
                    date,
                    fantasyData
                }
            ]
        })
    }
}