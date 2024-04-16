import { executeQuery } from '../service/athenaService';
import { Request, Response } from 'express';
import { connectToDatabase } from '../mongo/conn.js';

const databaseStatic = `"gtfs-static-data-db"`;
const databaseDaily = `"stm-gtfs-daily-stop-info"`;
const databaseAnalytics = `"gtfs-analytics-data"`;

//const tableDailyInfo = `"stm-gtfs-daily-stops-info-setup"`
//const tableAnalytics = `""`

const outputLocationStatic = 's3://monitoring-mtl-gtfs-static/Unsaved/';
const outputLocationDaily = 's3://monitoring-mtl-gtfs-static-daily/Unsaved/';
const outputLocationAnalytics = 's3://monitoring-mtl-gtfs-analytics/Unsaved/';

const segmentsCollectionName = 'monitoring-mtl-stm-segments-analysis';

export const getSimpleHealthCheck = (_req: Request, res: Response) => {
    res.status(200).json({ message: 'STM Serverles API is up and running' });
};

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

export const getSegmentsData = async (_req: Request, res: Response) => {
    const startUnix = Number(_req.query.start);
    const endUnix = Number(_req.query.end);
    const route_id = Number(_req.query.route_id);
    try {
        const db = await connectToDatabase();
        if (!db) {
            res.status(409).json({ message: 'Database connection failed' });
        }
        const segmentsCollection = db.collection(segmentsCollectionName);
        const segments = await segmentsCollection
            .find({
                $and: [
                    {
                        arrival_time_unix: { $lte: endUnix, $gte: startUnix },
                    },
                    {
                        routeId: route_id,
                    },
                ],
            })
            .limit(1000000)
            .toArray();

        console.log(segments);
        if (segments) {
            res.status(200).json(segments);
        } else {
            res.status(409).json({ message: "Couldn't fetch segments from MongoDB." });
        }
    } catch (error) {
        console.error('Error fetching segments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSegmentsAnalysis = async (_req: Request, res: Response) => {
    const startUnix = Number(_req.query.start);
    const endUnix = Number(_req.query.end);
    const route_id = Number(_req.query.route_id);
    try {
        const db = await connectToDatabase();
        if (!db) {
            res.status(409).json({ message: 'Database connection failed' });
        }
        const segmentsCollection = db.collection(segmentsCollectionName);
        const segmentsAverages = await segmentsCollection
            .aggregate([
                {
                    $match: {
                        arrival_time_unix: { $gte: startUnix, $lte: endUnix },
                        routeId: route_id,
                    },
                },
                {
                    $group: {
                        _id: {
                            stop_id: '$stop_id',
                            previous_stop_id: '$previous_stop_id',
                        },
                        average_offset_difference: { $avg: '$offset_difference' },
                    },
                },
                {
                    $sort: { '_id.previous_stop_id': 1 }, // ascending
                },
            ])
            .limit(1000000)
            .toArray();

        console.log(segmentsAverages);
        if (segmentsAverages) {
            res.status(200).json(segmentsAverages);
        } else {
            res.status(409).json({ message: "Couldn't fetch segments from MongoDB." });
        }
    } catch (error) {
        console.error('Error fetching segments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
    const queryString = `SELECT DISTINCT "route_info" FROM "stm-gtfs-daily-stops-info-setup"."monitoring_mtl_gtfs_daily_stops_infos" where "route_id" = ${Number(
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
        SELECT * FROM "stm-gtfs-daily-stops-info-setup"."monitoring_mtl_gtfs_daily_stops_infos" 
        WHERE "trip_id" IN (
            SELECT distinct "trip_id" 
            FROM "stm-gtfs-daily-stops-info-setup"."monitoring_mtl_gtfs_daily_stops_infos"
            WHERE "route_info" = '${req.body.routeName}'
            AND "arrival_time_unix" BETWEEN ${currentTime - timeWindow} AND ${currentTime + timeWindow} 
            LIMIT 1)
    `;

    executeQuery(queryString, databaseDaily, outputLocationDaily)
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

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
    SELECT 
        "routes"."route_id", 
        "route_short_name", 
        MAX(route_long_name) AS "route_long_name", 
        MAX(route_info) AS "route_info", 
        MAX(shape_id) AS "shape_id", 
        "stops"."stop_id", 
        MAX(stop_name) AS "stop_name", 
        MAX(stop_lat) AS "stop_lat", 
        MAX(stop_lon) AS "stop_lon", 
        MAX(wheelchair_accessible) AS "wheelchair_accessible", 
        MAX(wheelchair_boarding) AS "wheelchair_boarding"
    FROM 
        "gtfs-static-data-db"."routes" AS "routes"
    JOIN 
        "stm-gtfs-daily-stops-info-setup"."monitoring_mtl_gtfs_daily_stops_infos" AS "stops"
    ON 
        "routes"."route_id" = "stops"."route_id"
        AND "arrival_time_unix" BETWEEN 1701084380 AND 1701092380 
        AND "route_type" NOT IN (1)
    GROUP BY 
        "routes"."route_id", 
        "route_short_name",
        "stops"."stop_id"
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
                        wheelchair_boarding: currentValue.wheelchair_boarding,
                    });
                }
                return accumulator;
            }, {});

            const finalResponse = {
                data: Object.values(transformedResponse),
            };

            res.status(200).json(finalResponse);
        })
        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};

export const getAnalyze = (req: Request, res: Response) => {
    const queryString = `
    SELECT "routeid", "vehicleid", "current_occupancy", "offset" FROM "gtfs-analytics-data"."monitoring_mtl_stm_analytics" 
    WHERE "routeid" = ${req.query.routeId} and "stop_id" = ${req.query.stopId} and "arrival_time_unix" 
    BETWEEN ${req.query.start} and ${req.query.end}`;

    let totalOffset = 0;
    const offsetArray: number[] = [];
    const seatOccupancyCounts = {
        many_seats_available: 0,
        few_seats_available: 0,
        standing_room_only: 0,
    };
    const busWheelchairLevelCounts = {
        accessible_2: 0,
        accessible_1: 0,
        not_accessible: 0,
    };

    executeQuery(queryString, databaseAnalytics, outputLocationAnalytics)
        .then((response) => {
            response.forEach((row) => {
                // Calculate total for average OFFSET
                totalOffset += Number(row.offset);
                offsetArray.push(Number(row.offset));

                // Count instances for each type of seat occupancy
                if (row.current_occupancy === 'MANY_SEATS_AVAILABLE') {
                    seatOccupancyCounts.many_seats_available++;
                } else if (row.current_occupancy === 'FEW_SEATS_AVAILABLE') {
                    seatOccupancyCounts.few_seats_available++;
                } else if (row.current_occupancy === 'STANDING_ROOM_ONLY') {
                    seatOccupancyCounts.standing_room_only++;
                }

                // Categorize bus ID
                if (Number(row.vehicleid) < 29000) {
                    busWheelchairLevelCounts.not_accessible++;
                } else if (Number(row.vehicleid) >= 29000 && Number(row.vehicleid) < 37054) {
                    busWheelchairLevelCounts.accessible_1++;
                } else if (Number(row.vehicleid) >= 37054) {
                    busWheelchairLevelCounts.accessible_2++;
                }
            });

            // Calculate average of OFFSET
            const averageOffset = totalOffset / response.length;

            res.status(200).json({
                averageOffset,
                offsetArray,
                seatOccupancyCounts,
                busWheelchairLevelCounts,
            });
        })

        .catch((error) => {
            res.status(409).json({ message: error.message });
        });
};
