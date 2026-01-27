import express from 'express';
import { getActiveHotspots, getHotspotDetails } from '../../controllers/admin/hotspot.controller.js';
import { verifyToken} from '../../middlewares/auth.middleware.js';

const router = express.Router();

// All hotspot routes are protected
router.use(verifyToken);


router.get('/', getActiveHotspots);

router.get('/:id', getHotspotDetails);


export default router;
