import axios from 'axios';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { DynamoDBClient, QueryCommand, ScanOutput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { apiKey, apiUrl } from '../config/config';
import { Request, Response } from 'express';

// Create an Axios instance with the custom headers
const axiosInstance = axios.create({
    headers: {
        apiKey: apiKey,
    },
});

// Get the vehicle position from the STM API
export const getVehiclePosition = (_req: Request, res: Response) => {
    axiosInstance
        .get(apiUrl + 'tripUpdates', { responseType: 'arraybuffer' })
        .then((response) => {
            // Create a FeedMessage object from the GTFS-realtime protobuf
            const decodedData = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(response.data));

            // Return the FeedMessage as JSON
            res.status(200).json({
                body: decodedData,
            });
        })
        .catch((error) => {
            // Error handling
            res.status(409).json({
                body: JSON.stringify({
                    message: 'Error fetching STM data:' + error,
                }),
            });
        });
};

export const getAllStops = (_req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'stops',
        },
    });
};

export const getStopById = (req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'stops',
            id: req.params.id,
        },
    });
};

export const getAllRoutes = (_req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'routes',
        },
    });
};

export const getRouteById = (req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'routes',
            id: req.params.id,
        },
    });
};

export const getAllShapes = (_req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'shapes',
        },
    });
};

export const getShapeById = (req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'shapes',
            id: req.params.id,
        },
    });
};

export const getAllTrips = (_req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'trips',
        },
    });
};

export const getAllTripsForRoute = (req: Request, res: Response) => {
    res.status(200).json({
        body: {
            endpoint: 'trips',
            id: req.params.id,
        },
    });
    return;

    const tableName = 'STM_DATA_STATIC_TRIPS';
    const command = new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'route_id = :routeId',
        ExpressionAttributeValues: { ':routeId': { S: req.params.id } },
    });

    const client = new DynamoDBClient({ region: 'us-east-1' });

    client
        .send(command)
        .then((data: ScanOutput) => {
            res.status(200).json({
                data: data.Items?.map((item) => unmarshall(item)),
                count: data.Count,
            });
        })
        .catch((error) => {
            res.send(error.message);
        });
};
