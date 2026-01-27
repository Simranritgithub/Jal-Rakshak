import express from "express";
import { createAlert, getAlerts } from "../../controllers/admin/alert.controller.js";

const router = express.Router();

// POST /api/alerts/create
router.post("/", createAlert);
router.post("/",getAlerts );
export default router;

