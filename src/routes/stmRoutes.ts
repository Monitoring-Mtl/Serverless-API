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
    getSetup,
    getSimpleHealthCheck,
    getAnalyze,
    getSegmentsAnalysis,
    getSegmentsData,
} from '../controller/stmController.js';

const router: Router = Router();

router.get('/simpleHealthCheck', getSimpleHealthCheck);

router.get('/trips', getAllTrips);

router.get('/trips/:id', getAllTripsForRoute);

router.get('/routes', getAllRoutes);
router.get('/routes/:id', getRouteById);

router.get('/stops', getAllStops);
router.get('/stops/:id', getStopById);

router.get('/shapes', getAllShapes);
router.get('/shapes/:id', getShapeById);

router.get('/routeName/:id', getRouteNameByRouteId);
router.post('/routeInfo', getRouteInfoByRouteName);

router.get('/setup', getSetup);

router.get('/segments', getSegmentsData);
router.get('/analyzeSegments', getSegmentsAnalysis);

router.get('/analyze', getAnalyze);

export default router;
