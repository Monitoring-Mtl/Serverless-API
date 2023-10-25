import axios from 'axios';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { getMockReq } from '@jest-mock/express';
import { Response } from 'express';

const mockFeedMessageData = {
    header: {
        gtfsRealtimeVersion: '2.0',
    },
    entity: [
        {
            id: '1',
            vehicle: {
                trip: {
                    tripId: 'tripA',
                },
                vehicle: {
                    id: 'vehicleX',
                },
                position: {
                    latitude: 40.73060989379883,
                    longitude: -73.93524169921875,
                },
            },
        },
        {
            id: '2',
            vehicle: {
                trip: {
                    tripId: 'tripB',
                },
                vehicle: {
                    id: 'vehicleY',
                },
                position: {
                    latitude: 40.73060989379883,
                    longitude: -73.93524169921875,
                },
            },
        },
    ],
};
const serializedData = GtfsRealtimeBindings.transit_realtime.FeedMessage.encode(mockFeedMessageData).finish();

// Mock axios first
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
};

import { getVehiclePosition } from '../../../src/controller/stmController';

describe('getVehiclePosition', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch vehicle position and return FeedMessage as JSON', async () => {
        mockedAxios.create.mockReturnValueOnce({
            get: jest.fn().mockResolvedValue({ data: serializedData }),
        } as never);

        const res = mockResponse();

        await getVehiclePosition(getMockReq(), res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle error when fetching STM data', async () => {
        mockedAxios.create.mockReturnValueOnce({
            get: jest.fn().mockRejectedValue(new Error('')),
        } as never);

        const res = mockResponse();

        await getVehiclePosition(getMockReq(), res);

        expect(res.status).toHaveBeenCalledWith(409);
    });
});
