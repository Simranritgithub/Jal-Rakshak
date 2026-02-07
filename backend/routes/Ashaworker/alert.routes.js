import express from "express";
import {getalertsbylocation} from "../../controllers/Ashaworker/alert.js";
import { allowRoles, verifyToken } from "../../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/alerts",verifyToken,allowRoles("Asha worker"),getalertsbylocation);
export default router;