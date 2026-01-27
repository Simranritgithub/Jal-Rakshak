import express from "express";
import { therapist } from "../../controllers/healthofficial/therapist.controller.js";
const router = express.Router();

router.post("/therapist", therapist);

export default router;
