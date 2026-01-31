import { Router } from "express";
import { getAdminDashboardData, addHealthOfficial, setPassword,getPendingAshaWorkers,getPendingVolunteers,updateUserStatus, getHealthOfficialDetails, getAllRegions, getAshaWorkerById ,statusasha,getApproveAshaWorkers  } from "../../controllers/admin/enrollment.controller.js";
import { verifyToken, allowRoles } from "../../middlewares/auth.middleware.js";
const router = Router();

// A single, efficient endpoint to fetch all data for the admin enrollment dashboard.
router.get("/dashboard", getAdminDashboardData);
router.post("/add-health", addHealthOfficial);
router.post("/set-password", setPassword);
router.get("/pending/asha-workers",verifyToken,allowRoles("Admin"), getPendingAshaWorkers);
router.get("/approved/asha-workers",verifyToken,allowRoles("Admin"), getApproveAshaWorkers);

router.get("/view/asha-workers/:id",verifyToken,allowRoles("Admin"), getAshaWorkerById);
router.get("/pending/volunteers", getPendingVolunteers);
router.patch("/status/:id",verifyToken,allowRoles("Admin"),statusasha );
router.get("/health-official/:userId", getHealthOfficialDetails)
router.get("/region", getAllRegions);
export default router;