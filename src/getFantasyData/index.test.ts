import {getFantasyData} from "./index";
import {getNflEventIds} from "../helpers/getNflEventIds/getNflEventIds";
import {getFantasyDataFromNflGame} from "../helpers/getFantasyDataFromNflGame/getFantasyDataFromNflGame";

jest.mock('../helpers/getNflEventIds/getNflEventIds');
jest.mock('../helpers/getFantasyDataFromNflGame/getFantasyDataFromNflGame');

(getNflEventIds as jest.Mock).mockResolvedValue([1, 2, 3]);
(getFantasyDataFromNflGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);

describe('getFantasyData', () => {
    let result: any;
    const sport = 'sport';
    const week = 'week';
    const season = 'season';
    const event = {sport, week, season};

    beforeEach(async () => {
        result = await getFantasyData(event)
    });

    it('should call getNflEventIds with correct params', () => {
        expect(getNflEventIds).toHaveBeenCalledWith(week, season)
    });

    it.each([1, 2, 3])(
        'should call getFantasyDataFromNflGame with correct params', (eventId) => {
            expect(getFantasyDataFromNflGame).toHaveBeenCalledWith(eventId)
        }
    );

    it('should return expected result', () => {
        expect(result).toEqual([
            {some: 'stuff'},
            {some: 'other stuff'},
            {some: 'stuff'},
            {some: 'other stuff'},
            {some: 'stuff'},
            {some: 'other stuff'}
        ])
    });
});