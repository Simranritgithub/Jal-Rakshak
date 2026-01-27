import express from "express";
import { getSensorData } from "../../controllers/admin/water.controller.js";

const router = express.Router();

// GET /api/sensor_data
router.get("/sensor_data", getSensorData);

export default router;