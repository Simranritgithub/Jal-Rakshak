import express from "express";
import { createWaterSample } from "../../controllers/Ashaworker/Createsample.js";
import { allowRoles, verifyToken } from '../../middlewares/auth.middleware.js';

const router = express.Router();


router.post("/create/samples", verifyToken,allowRoles("Asha worker"),createWaterSample);

export default router;