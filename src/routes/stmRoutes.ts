import { Router } from "express";
import {
    getVehiclePosition,
    getAllTripsForRoute,
} from "../controller/stmController.js";

const router: Router = Router();

router.get("/vehiclePosition", getVehiclePosition);

router.get("/trips/:id", getAllTripsForRoute);

export default router;
