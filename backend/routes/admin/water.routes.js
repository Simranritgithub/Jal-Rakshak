import express from "express";
import { allwaterreports } from "../../controllers/admin/water.controller.js";
import { verifyToken,allowRoles } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// GET /api/sensor_data
router.get("/reports", verifyToken,allowRoles("Admin", "Asha worker"),allwaterreports);

export default router;