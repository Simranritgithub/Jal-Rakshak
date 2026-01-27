import { Router } from "express";
import { getAdminDashboardData, addHealthOfficial, setPassword,getPendingAshaWorkers,getPendingVolunteers,updateUserStatus, getHealthOfficialDetails, getAllRegions   } from "../../controllers/admin/enrollment.controller.js";
import { verifyToken, allowRoles } from "../../middlewares/auth.middleware.js";
const router = Router();

// A single, efficient endpoint to fetch all data for the admin enrollment dashboard.
router.get("/dashboard", getAdminDashboardData);
router.post("/add-health", addHealthOfficial);
router.post("/set-password", setPassword);
router.get("/pending/asha-workers", getPendingAshaWorkers);
router.get("/pending/volunteers", getPendingVolunteers);
router.patch("/user/:userId/status", updateUserStatus)
router.get("/health-official/:userId", getHealthOfficialDetails)
router.get("/region", getAllRegions);
export default router;