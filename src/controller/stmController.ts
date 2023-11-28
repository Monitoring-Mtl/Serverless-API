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

// export const getSetup = (_req: Request, res: Response) => {
//     const queryString = `
//         SELECT "routes"."route_id", "route_short_name", "route_long_name", "route_info", "trip_id", "shape_id", "arrival_time_unix", "stop_id", "stop_name", "stop_lat", "stop_lon", "wheelchair_accessible", "wheelchair_boarding"
//         FROM "gtfs-static-data-db"."routes" AS "routes"
//         JOIN "stm-gtfs-daily-stop-info"."daily_stops_info" AS "stops"
//         ON "routes"."route_id" = "stops"."route_id" AND "arrival_time_unix" BETWEEN 1701084380 AND 1701092380 AND "route_type" NOT IN (1)
//     `;
//     executeQuery(queryString, databaseStatic, outputLocationStatic)
//         .then((response) => {
//             res.status(200).json({ response });
//         })
//         .catch((error) => {
//             res.status(409).json({ message: error.message });
//         });
// };

interface RouteInfo {
    route_id: string | number;
    route_short_name: string | number | undefined;
    route_long_name: string | number | undefined;
    route_info: {
        direction: string | number | undefined;
        trip_id: string | number | undefined;
        shape_id: string | number | undefined;
        wheelchair_accessible: string | number | undefined;
        stops: {
            arrival_time_unix: string | number | undefined;
            stop_id: string | number | undefined;
            stop_name: string | number | undefined;
            stop_lat: string | number | undefined;
            stop_lon: string | number | undefined;
            wheelchair_boarding: string | number | undefined;
        }[];
    }[];
}

interface Accumulator {
    [key: string]: RouteInfo;
}

export const getSetup = (_req: Request, res: Response) => {
    const queryString = `
        SELECT "routes"."route_id", "route_short_name", "route_long_name", "route_info", "trip_id", "shape_id", "arrival_time_unix", "stop_id", "stop_name", "stop_lat", "stop_lon", "wheelchair_accessible", "wheelchair_boarding"
        FROM "gtfs-static-data-db"."routes" AS "routes"
        JOIN "stm-gtfs-daily-stop-info"."daily_stops_info" AS "stops"
        ON "routes"."route_id" = "stops"."route_id" AND "arrival_time_unix" BETWEEN 1701084380 AND 1701092380 AND "route_type" NOT IN (1)
    `;

    executeQuery(queryString, databaseStatic, outputLocationStatic)
        .then((response) => {
            const transformedResponse = response.reduce<Accumulator>((accumulator, currentValue) => {
                // Ensure route_id is not undefined
                if (currentValue.route_id !== undefined) {
                    const routeId = currentValue.route_id.toString(); // Convert to string if necessary

                    if (!accumulator[routeId]) {
                        accumulator[routeId] = {
                            route_id: currentValue.route_id,
                            route_short_name: currentValue.route_short_name,
                            route_long_name: currentValue.route_long_name,
                            route_info: [],
                        };
                    }

                    let routeInfo = accumulator[routeId].route_info.find(
                        (info) => info.direction === currentValue.route_info,
                    );
                    if (!routeInfo) {
                        routeInfo = {
                            direction: currentValue.route_info,
                            trip_id: currentValue.trip_id,
                            shape_id: currentValue.shape_id,
                            wheelchair_accessible: currentValue.wheelchair_accessible,
                            stops: [],
                        };
                        accumulator[routeId].route_info.push(routeInfo);
                    }

                    routeInfo.stops.push({
                        arrival_time_unix: currentValue.arrival_time_unix,
                        stop_id: currentValue.stop_id,
                        stop_name: currentValue.stop_name,
                        stop_lat: currentValue.stop_lat,
                        stop_lon: currentValue.stop_lon,
                        // wheelchair_accessible: currentValue.wheelchair_accessible,
                        wheelchair_boarding: currentValue.wheelchair_boarding,
                    });
                }
                return accumulator;
            }, {});

            const finalResponse = {
                data: Object.values(transformedResponse),
            };

            res.status(200).json(finalResponse);
            // res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};
