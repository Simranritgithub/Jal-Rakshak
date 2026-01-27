import express from 'express';
import {
    getAllStates, createState, deleteState,
    getAllRegions, createRegion, deleteRegion,
    getAllVillages, createVillage, deleteVillage
} from '../../controllers/admin/managelocation.controller.js';

const router = express.Router();

// State Routes
router.route('/states').get(getAllStates).post(createState);
router.route('/states/:id').delete(deleteState);

// Region Routes
router.route('/regions').get(getAllRegions).post(createRegion);
router.route('/regions/:id').delete(deleteRegion);

// Village Routes
router.route('/villages').get(getAllVillages).post(createVillage);
router.route('/villages/:id').delete(deleteVillage);

export default router;


