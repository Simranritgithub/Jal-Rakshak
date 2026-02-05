import express from "express";
import { createWaterSample} from "../../controllers/Ashaworker/Createsample.js";
import { getwaterreportsbyid } from "../../controllers/Ashaworker/Waterreport.js";
import { allowRoles, verifyToken } from '../../middlewares/auth.middleware.js';

const router = express.Router();


router.post("/create/samples", verifyToken,allowRoles("Asha worker"),createWaterSample);router.post("/my/samples", verifyToken,allowRoles("Asha worker"),getwaterreportsbyid)
export default router;