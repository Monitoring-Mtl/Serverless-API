import { getVehiclePosition } from '../../../src/controller/stmController';
import axios from 'axios';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { getMockReq, getMockRes } from '@jest-mock/express';

jest.mock('axios');
const mockAxios = jest.spyOn(axios, 'get');

// Create a mock request object
const mockRequest = getMockReq();

describe('getVehiclePosition', () => {
    it('should return decoded data as JSON', async () => {
        const mockResponse = {
            data: new Uint8Array([10, 2, 8, 1, 18, 1]),
        };

        mockAxios.mockResolvedValue(mockResponse);

        const expectedData = {
            entity: [
                {
                    id: '1',
                },
            ],
        };
        const mockFeedMessage = new GtfsRealtimeBindings.transit_realtime.FeedMessage();
        mockFeedMessage.entity = expectedData.entity;

        const mockDecode = jest.spyOn(GtfsRealtimeBindings.transit_realtime.FeedMessage, 'decode');
        mockDecode.mockReturnValue(mockFeedMessage);

        const mockRes = getMockRes().res;

        await getVehiclePosition(mockRequest, mockRes);

        expect(mockDecode).toHaveBeenCalledWith(mockResponse.data);
        expect(mockRes).toHaveBeenCalledWith(200);
        expect(mockRes).toHaveBeenCalledWith({ body: expectedData });
    });

    it('should return an error message if the request fails', async () => {
        const mockError = new Error('Request failed');
        mockAxios.mockRejectedValue(mockError);

        const mockRes = getMockRes().res;;

        await getVehiclePosition(mockRequest, mockRes);

        expect(mockRes).toHaveBeenCalledWith(409);
        expect(mockRes).toHaveBeenCalledWith({
            body: JSON.stringify({
                message: 'Error fetching STM data:' + mockError,
            }),
        });
    });
});