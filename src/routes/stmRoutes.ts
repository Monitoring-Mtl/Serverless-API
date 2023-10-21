import { Router } from 'express';
import {
    getVehiclePosition,
    getAllTripsForRoute,
    getAllRoutes,
    getAllTrips,
    getRouteById,
    getAllStops,
    getStopById,
    getAllShapes,
    getShapeById,
} from '../controller/stmController.js';

const router: Router = Router();

router.get('/vehiclePosition', getVehiclePosition);

router.get('/trips', getAllTrips);

router.get('/trips/:id', getAllTripsForRoute);

router.get('/routes', getAllRoutes);
router.get('/routes/:id', getRouteById);

router.get('/stops', getAllStops);
router.get('/stops/:id', getStopById);

router.get('/shapes', getAllShapes);
router.get('/shapes/:id', getShapeById);

export default router;
