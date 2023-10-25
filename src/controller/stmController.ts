import axios from 'axios';
import AWS from 'aws-sdk';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { DynamoDBClient, QueryCommand, ScanOutput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { apiKey, apiUrl } from '../config/config';
import { Request, Response } from 'express';
import { routes, shape, trips, stops } from '../../data/data';

const athena = new AWS.Athena();

// Get the vehicle position from the STM API
export const getVehiclePosition = async (_req: Request, res: Response) => {
    // Create an Axios instance with the custom headers
    const axiosInstance = axios.create({
        headers: {
            apiKey: apiKey,
        },
    });

    await axiosInstance
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
                    message: 'Error fetching STM data : ' + error,
                }),
            });
        });
};

export const getAllStops = (_req: Request, res: Response) => {
    res.status(200).json({
        stops: stops,
    });
};

export const getStopById = (req: Request, res: Response) => {
    res.status(200).json({
        stop: stops.filter((stop) => stop.stop_id === Number(req.params.id)),
    });
};

export const getAllRoutes = async (_req: Request, res: Response) => {
    const params: AWS.Athena.StartQueryExecutionInput = {
        QueryString: `SELECT * FROM "gtfs-static-data-db"."routes"`,
        ResultConfiguration: {
            OutputLocation: 's3://monitoring-mtl-gtfs-static/Unsaved/',
        },
    };

    athena.startQueryExecution(params, (err, data) => {
        if (err) {
            res.status(409).send(err.message);
        } else {
            const queryExecutionId = data.QueryExecutionId || '';

            if (!queryExecutionId) {
                res.status(409).send('Query Execution Id is missing');
            }

            // Start polling
            let keepPolling = true;
            while (keepPolling) {
                athena.getQueryExecution({ QueryExecutionId: queryExecutionId }, (err, data) => {
                    if (err) {
                        console.error(err);
                        keepPolling = false;
                        return;
                    }

                    const queryExecutionStatus = data.QueryExecution?.Status?.State;

                    if (queryExecutionStatus === 'SUCCEEDED') {
                        athena.getQueryResults({ QueryExecutionId: queryExecutionId }, (err, results) => {
                            if (err) {
                                res.status(409).send(err.message);
                            }
                            res.status(200).json({
                                routes: results,
                            });
                        });
                        keepPolling = false;
                    } else if (queryExecutionStatus === 'FAILED' || queryExecutionStatus === 'CANCELLED') {
                        console.error('Athena query failed or was cancelled');
                        keepPolling = false;
                    } else {
                        // Add a delay before the next check
                        setTimeout(() => {}, 50);
                    }
                });
            }
        }
    });
};

export const getRouteById = (req: Request, res: Response) => {
    res.status(200).json({
        route: routes.filter((route) => route.route_id === Number(req.params.id)),
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
        shape: shape,
    });
};

export const getAllTrips = (_req: Request, res: Response) => {
    res.status(200).json({
        trips: trips,
    });
};

export const getAllTripsForRoute = (req: Request, res: Response) => {
    res.status(200).json({
        trips: trips.filter((trip) => trip.route_id === 5),
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
