import express from "express";
import { sendAlert, getAlerts } from "../../controllers/admin/alert.controller.js";
import { verifyToken,allowRoles } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// POST /api/alerts/create
router.post("/send", verifyToken, allowRoles("Admin"), sendAlert);

router.get("/getalerts",verifyToken, allowRoles("Admin"),getAlerts );
export default router;

