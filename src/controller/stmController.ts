import { executeQuery } from '../service/athenaService';
import { Request, Response } from 'express';

export const getAllStops = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."stops"`;

    executeQuery(queryString)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getStopById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."stops" WHERE stop_id = '${req.params.id}'`;

    executeQuery(queryString)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAllRoutes = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."routes"`;

    executeQuery(queryString)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getRouteById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."routes" WHERE route_id = ${req.params.id}`;

    executeQuery(queryString)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAllShapes = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."shapes"`;

    executeQuery(queryString)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getShapeById = (req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."shapes" WHERE shape_id = ${req.params.id}`;

    executeQuery(queryString)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAllTrips = (_req: Request, res: Response) => {
    const queryString = `SELECT * FROM "gtfs-static-data-db"."trips"`;

    executeQuery(queryString)
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

    executeQuery(queryString)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.send(error.message);
            res.status(409).json({ message: error.message });
        });
};
