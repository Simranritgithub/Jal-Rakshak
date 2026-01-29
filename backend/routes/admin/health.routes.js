// import express from 'express';
// import {
//   getDashboardStats,
//   getWeeklyCases,
//   getDiseaseBreakdown,
//   getAllDiseases,
//   assignWorkerToVillage,
//   unassignWorkerFromVillage,
//   sendAlert,
//   // triggerPrediction,
//   getLatestRecommendation
// } from '../../controllers/admin/health.controller.js'; // Note the .js extension

// const router = express.Router();

// // --- Dashboard Routes ---
// router.get('/dashboard/stats', getDashboardStats);
// router.get('/dashboard/weekly-cases', getWeeklyCases);
// router.get('/dashboard/disease-breakdown', getDiseaseBreakdown);



// // --- Disease Routes ---
// router.get('/diseases', getAllDiseases);

// // --- Assignment Routes (ASHA Workers) ---
// router.post('/assignments/assign', assignWorkerToVillage);
// router.post('/assignments/unassign', unassignWorkerFromVillage);

// // --- Alert Routes ---
// router.post('/alerts', sendAlert);

// // --- AI Prediction Routes ---
// router.post('/predictions/village/:villageId', triggerPrediction);
// router.get('/predictions/latest/:villageId', getLatestRecommendation);

// export default router;