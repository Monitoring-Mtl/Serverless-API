import { Router } from 'express';
import {
    getAllTripsForRoute,
    getAllRoutes,
    getAllTrips,
    getRouteById,
    getAllStops,
    getStopById,
    getAllShapes,
    getShapeById,
    getRouteNameByRouteId,
    getRouteInfoByRouteName,
} from '../controller/stmController.js';

const router: Router = Router();

router.get('/trips', getAllTrips);

router.get('/trips/:id', getAllTripsForRoute);

router.get('/routes', getAllRoutes);
router.get('/routes/:id', getRouteById);

router.get('/stops', getAllStops);
router.get('/stops/:id', getStopById);

router.get('/shapes', getAllShapes);
router.get('/shapes/:id', getShapeById);

router.get('/routeName/:id', getRouteNameByRouteId);
router.get('/routeInfo/:id', getRouteInfoByRouteName);

export default router;
