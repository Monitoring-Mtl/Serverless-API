import axios from 'axios';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { executeQuery } from '../service/athenaService';
import { apiKey, apiUrl } from '../config/config';
import { Request, Response } from 'express';
import { resultSetToJson } from '../utils/dataUtils';

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
    const queryString = `SELECT * FROM "gtfs-static-data-db"."stops"`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};

export const getStopById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."stops" WHERE stop_id = ${Number(req.params.id)}`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};

export const getAllRoutes = async (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."routes"`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};

export const getRouteById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."routes" WHERE route_id = ${Number(req.params.id)}`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};

export const getAllShapes = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."shapes"`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};

export const getShapeById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."shapes" WHERE shape_id = ${Number(req.params.id)}`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};

export const getAllTrips = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."trips"`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};

export const getAllTripsForRoute = async (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."trips" WHERE route_id = ${Number(
        req.params.id,
    )} limit 20;`;

    executeQuery(queryString)
        .then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.status(409).json({ error });
        });
};
