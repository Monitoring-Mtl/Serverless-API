import { executeQuery } from '../service/athenaService';
import { Request, Response } from 'express';

const databaseStatic = `"gtfs-static-data-db"`;
const databaseDaily = `"stm-gtfs-daily-stop-info"`;

const outputLocationStatic = 's3://monitoring-mtl-gtfs-static/Unsaved/';
const outputLocationDaily = 's3://monitoring-mtl-gtfs-static-daily/Unsaved/';

export const getAllStops = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."stops"`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getStopById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."stops" WHERE stop_id = '${req.params.id}'`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAllRoutes = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."routes"`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getRouteById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."routes" WHERE route_id = ${req.params.id}`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAllShapes = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."shapes"`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getShapeById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."shapes" WHERE shape_id = ${req.params.id}`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAllTrips = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."trips"`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAllTripsForRoute = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."trips" WHERE route_id = ${Number(
        req.params.id,
    )} limit 20;`;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.send(error.message);
            res.status(409).json({ message: error.message });
        });
};

export const getRouteNameByRouteId = (req: Request, res: Response) => {
    const queryString = `SELECT DISTINCT "route_info" FROM "stm-gtfs-daily-stop-info"."daily_stops_info" where "route_id" = ${Number(
        req.params.id,
    )}`;

    executeQuery(queryString, databaseDaily, outputLocationDaily)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            //res.send(error.message);
            res.status(409).json({ message: error.message });
        });
};

export const getRouteInfoByRouteName = (req: Request, res: Response) => {
    // This query uses twice the amount of data (it fetch twice)

    const timezoneOffset = new Date().getTimezoneOffset() * 60; // Timezone offset in seconds
    const montrealOffset = 4 * 60 * 60; // UTC-4 in seconds
    const currentTime = Math.floor(Date.now() / 1000) - timezoneOffset - montrealOffset;
    const timeWindow = 60 * 60; // 60 minutes in seconds

    const queryString = `
        SELECT * FROM "stm-gtfs-daily-stop-info"."daily_stops_info" 
        WHERE "trip_id" IN (
            SELECT distinct "trip_id" 
            FROM "stm-gtfs-daily-stop-info"."daily_stops_info"
            WHERE "route_info" = '${req.body.routeName}'
            AND "arrival_time_unix" BETWEEN ${currentTime - timeWindow} AND ${currentTime + timeWindow} 
            LIMIT 1)
    `;

    executeQuery(queryString, databaseDaily, outputLocationDaily)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            //res.send(error.message);
            res.status(409).json({ message: error.message });
        });
};
