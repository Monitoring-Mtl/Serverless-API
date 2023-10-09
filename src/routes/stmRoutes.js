import {Router} from 'express';
import {getVehiclePosition} from '../controller/stmController.js';

const router = new Router();

router.get('/vehiclePosition', getVehiclePosition)

export default router;
