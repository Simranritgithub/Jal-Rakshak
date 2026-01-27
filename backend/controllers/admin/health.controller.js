import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sendSMS } from "../../utils/sendSMS.js";
import cron from "node-cron";
import axios from "axios";
/**
 * @desc    Get all aggregated stats for the main dashboard view.
 * @route   GET /api/dashboard/stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Villages Connected
    const totalVillages = await prisma.village.count();

    // 2. Active Hotspots
    const activeHotspots = await prisma.village.count({
      where: { isHotspot: true },
    });

    // 3. Total New Cases Today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today in local time
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

    const newCasesTodayData = await prisma.case.aggregate({
      _sum: { count: true },
      where: { date: { gte: today, lt: tomorrow } },
    });
    const totalNewCasesToday = newCasesTodayData._sum.count || 0;

    // 4. Trending Disease (most cases in the last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const caseCounts = await prisma.case.groupBy({
      by: ["diseaseId"],
      _sum: { count: true },
      where: { date: { gte: sevenDaysAgo } },
      orderBy: { _sum: { count: "desc" } },
      take: 1,
    });

    let trendingDisease = "N/A";
    if (caseCounts.length > 0) {
      const topDisease = await prisma.disease.findUnique({
        where: { id: caseCounts[0].diseaseId },
      });
      trendingDisease = topDisease.name;
    }

    res.status(200).json({
      totalVillages,
      activeHotspots,
      trendingDisease,
      totalNewCasesToday,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get data formatted for the weekly cases graph.
 * @route   GET /api/dashboard/weekly-cases
 */
export const getWeeklyCases = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const cases = await prisma.case.findMany({
      where: { date: { gte: sevenDaysAgo } },
      select: { date: true, count: true },
    });

    const weeklyData = new Map();
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      weeklyData.set(d.toISOString().split("T")[0], 0);
    }

    cases.forEach((c) => {
      const dayString = c.date.toISOString().split("T")[0];
      if (weeklyData.has(dayString)) {
        weeklyData.set(dayString, weeklyData.get(dayString) + c.count);
      }
    });

    res.status(200).json(Object.fromEntries(weeklyData));
  } catch (error) {
    console.error("Error fetching weekly cases:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get data for the disease breakdown chart.
 * @route   GET /api/dashboard/disease-breakdown
 */
export const getDiseaseBreakdown = async (req, res) => {
  try {
    const accurateBreakdown = await prisma.case.groupBy({
      by: ["diseaseId"],
      _sum: { count: true },
    });

    const diseaseIds = accurateBreakdown.map((d) => d.diseaseId);
    const diseases = await prisma.disease.findMany({
      where: { id: { in: diseaseIds } },
      select: { id: true, name: true },
    });

    const diseaseMap = new Map(diseases.map((d) => [d.id, d.name]));

    const result = accurateBreakdown.map((item) => ({
      name: diseaseMap.get(item.diseaseId) || "Unknown Disease",
      count: item._sum.count || 0,
    }));
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching disease breakdown:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================================================================
// --- DISEASE CONTROLLERS ---
// =================================================================

/**
 * @desc    Get a list of all trackable diseases.
 * @route   GET /api/diseases
 */
export const getAllDiseases = async (req, res) => {
  try {
    const diseases = await prisma.disease.findMany({
      orderBy: { name: "asc" },
    });
    res.status(200).json(diseases);
  } catch (error) {
    console.error("Error fetching diseases:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================================================================
// --- ASSIGNMENT CONTROLLERS (ASHA WORKER) ---
// =================================================================

/**
 * @desc    Assign an ASHA worker to a village.
 * @route   POST /api/assignments/assign
 */
export const assignWorkerToVillage = async (req, res) => {
  try {
    const { ashaWorkerId, villageId } = req.body;
    if (!ashaWorkerId || !villageId) {
      return res
        .status(400)
        .json({ message: "ashaWorkerId and villageId are required." });
    }

    // Fetch both records (atomic-ish read)
    const [user, village] = await Promise.all([
      prisma.user.findUnique({ where: { id: ashaWorkerId } }),
      prisma.village.findUnique({ where: { id: villageId } }),
    ]);

    if (!user) {
      return res.status(404).json({ message: `ASHA worker not found ` });
    }
    if (!village) {
      return res.status(404).json({ message: `Village not found ` });
    }

    // Ensure role is ASHA_WORKER (adjust exact role name to your enum value if different)
    if (user.role !== "ASHA_WORKER") {
      return res.status(400).json({
        message: "User is not an ASHA worker and cannot be assigned.",
      });
    }

    // Already assigned to same village -> idempotent success
    if (user.villageId === villageId) {
      return res
        .status(200)
        .json({ message: "Worker already assigned to this village.", user });
    }

    // Update the user to set villageId (this creates the relation in Mongo)
    const updatedUser = await prisma.user.update({
      where: { id: ashaWorkerId },
      data: { villageId },
    });

    const prevVillage = user.villageId ?? null;
    const action = prevVillage ? "reassigned" : "assigned";

    return res.status(200).json({
      message: `Worker ${action} successfully.`,
      previousVillageId: prevVillage,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error assigning worker:", error);
    return res.status(500).json({
      message: "Server error while assigning worker.",
      error: error.message,
    });
  }
};

export const unassignWorkerFromVillage = async (req, res) => {
  try {
    const { ashaWorkerId, villageId } = req.body;
    if (!ashaWorkerId || !villageId) {
      return res
        .status(400)
        .json({ message: "ashaWorkerId and villageId are required." });
    }

    const user = await prisma.user.findUnique({ where: { id: ashaWorkerId } });
    if (!user) {
      return res
        .status(404)
        .json({ message: `ASHA worker not found with id ${ashaWorkerId}` });
    }

    if (user.role !== "ASHA_WORKER") {
      return res.status(400).json({ message: "User is not an ASHA worker." });
    }

    // Ensure the user is actually assigned to that village
    if (!user.villageId) {
      return res
        .status(400)
        .json({ message: "This worker is not assigned to any village." });
    }
    if (user.villageId !== villageId) {
      return res.status(409).json({
        message: `Worker is assigned to a different village (current: ${user.villageId}). Provide correct villageId or reassign first.`,
      });
    }

    // Unassign by setting villageId to null
    const updatedUser = await prisma.user.update({
      where: { id: ashaWorkerId },
      data: { villageId: null },
    });

    return res
      .status(200)
      .json({ message: "Worker unassigned successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error unassigning worker:", error);
    return res.status(500).json({
      message: "Server error while unassigning worker.",
      error: error.message,
    });
  }
};

// =================================================================
// --- PREDICTION CONTROLLERS ---
// =================================================================

export const sendAlert = async (req, res) => {
  try {
    const { title, message, target, regionId } = req.body;

    // 1️⃣ Validate input
    const validTargets = [
      "ALL",
      "VILLAGER",
      "ASHA_WORKER",
      "VOLUNTEER",
      "HEALTH_OFFICIAL",
    ];
    if (!title || !message || !target || !validTargets.includes(target)) {
      return res.status(400).json({
        success: false,
        message: "Title, message, target are required and must be valid.",
        validTargets,
      });
    }

    if (!regionId) {
      return res
        .status(400)
        .json({ success: false, message: "regionId is required." });
    }

    // 2️⃣ Fetch target users
    let targetUserQuery = {};
    if (target !== "ALL") {
      targetUserQuery = { where: { role: target, regionId, status: "ACTIVE" } };
    } else {
      targetUserQuery = { where: { regionId, status: "ACTIVE" } };
    }

    const targetUsers = await prisma.user.findMany({
      ...targetUserQuery,
      include: {
        region: { select: { language: true } },
        ashaWorker: true,
        villager: true,
        volunteer: true,
        healthOfficial: true,
      },
    });

    if (targetUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No users found for the specified target group in this region.",
      });
    }

    // 3️⃣ Create alert + notifications in a transaction
    const transactionResult = await prisma.$transaction(async (tx) => {
      const newAlert = await tx.alert.create({
        data: { title, message, target, regionId },
      });

      const notificationData = targetUsers.map((user) => ({
        userId: user.id,
        alertId: newAlert.id,
      }));

      await tx.userNotification.createMany({ data: notificationData });

      return { newAlert, notifiedUserCount: notificationData.length };
    });

    // 4️⃣ Send SMS to users in their regional language
    let results = [];
    for (const user of targetUsers) {
      const phone = user.ashaWorker?.contact || user.volunteer?.contact || null;

      if (!phone) continue;

      const lang = user.region?.language || "en";
      const result = await sendSMS(phone, message, lang);

      results.push({
        userId: user.id,
        phone,
        lang,
        success: result.success,
        translated: result.translated || null,
      });
    }

    // 5️⃣ Final Response
    res.status(201).json({
      success: true,
      message: `Alert "${transactionResult.newAlert.title}" created and sent to ${transactionResult.notifiedUserCount} users.`,
      alert: transactionResult.newAlert,
      smsResults: results,
    });
  } catch (error) {
    console.error("❌ Error sending alert:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending alert.",
      error: error.message,
    });
  }
};

// export const generatePredictionForVillage = async (villageId, inputData) => {
//   const ML_API_URL =
//     process.env.ML_MODEL_URL || "https://874d805097c7.ngrok-free.app";
//   if (!ML_API_URL) throw new Error("ML_MODEL_URL not set");

//   try {
//     console.log("📡 Sending data to ML model:", inputData);

//     // ✅ use ML_API_URL (not ML_MODEL_URL)
//     const response = await axios.post(`${ML_API_URL}/predict`, inputData);
//     const prediction = response.data;

//     console.log("✅ Received raw prediction:", prediction);

//     // ✅ Save directly into Prisma
//     await prisma.prediction.create({
//       data: {
//         villageId: villageId,
//         date: new Date(prediction.date),
//         anomalyScore: prediction.anomaly_score ?? null,
//         isAnomaly: prediction.is_anomaly ?? null,
//         riskLevel: prediction.risk_level || "UNKNOWN",
//         riskProbability: prediction.risk_probability ?? 0,
//         predictionTimestamp: new Date(prediction.prediction_timestamp),
//         diseases: prediction.diseases || [],
//         recommendation:
//           prediction.recommendation || "No recommendation provided",
//       },
//     });

//     return prediction;
//   } catch (error) {
//     console.error("❌ ML Model API Error:", error.message);

//     await prisma.prediction.create({
//       data: {
//         villageId: villageId,
//         date: new Date(),
//         anomalyScore: null,
//         isAnomaly: null,
//         riskLevel: "ERROR",
//         riskProbability: 0,
//         predictionTimestamp: new Date(),
//         diseases: [],
//         recommendation: `Prediction failed: ${error.message}`,
//       },
//     });

//     throw error;
//   }
// };
export const generatePredictionForVillage = async (villageId, inputData) => {
  const ML_API_URL =
    process.env.ML_MODEL_URL || "https://874d805097c7.ngrok-free.app";
  if (!ML_API_URL) throw new Error("ML_MODEL_URL not set");

  try {
    console.log("📡 Sending data to ML model:", inputData);

    // ✅ send to ML API
    const response = await axios.post(`${ML_API_URL}/predict`, inputData);
    const prediction = response.data;

    console.log("✅ Received raw prediction:", prediction);

    // ✅ Save into Prisma (relation via connect)
    await prisma.prediction.create({
      data: {
        date: new Date(prediction.date),
        anomalyScore: prediction.anomaly_score ?? null,
        isAnomaly: prediction.is_anomaly ?? null,
        riskLevel: prediction.risk_level || "UNKNOWN",
        riskProbability: prediction.risk_probability ?? 0,
        predictionTimestamp: new Date(prediction.prediction_timestamp),
        diseases: prediction.diseases || [],
        recommendation:
          prediction.recommendation || "No recommendation provided",
        village: {
          connect: { id: villageId }, // 👈 FIXED
        },
      },
    });

    return prediction;
  } catch (error) {
    console.error("❌ ML Model API Error:", error.message);

    // ✅ Save error entry too
    await prisma.prediction.create({
      data: {
        date: new Date(),
        anomalyScore: null,
        isAnomaly: null,
        riskLevel: "ERROR",
        riskProbability: 0,
        predictionTimestamp: new Date(),
        diseases: [],
        recommendation: `Prediction failed: ${error.message}`,
        village: {
          connect: { id: villageId }, // 👈 FIXED
        },
      },
    });

    throw error;
  }
};

/**
 * Manual trigger
 */
export const triggerPrediction = async (req, res) => {
  try {
    const { villageId } = req.params;
    const village = await prisma.village.findUnique({
      where: { id: villageId },
    });

    if (!village) return res.status(404).json({ message: "Village not found" });

    const today = new Date().toISOString().split("T")[0];
    const inputData = { village_id: village.id, date: today, ...req.body };

    const prediction = await generatePredictionForVillage(villageId, inputData);
    res.status(201).json({ message: "Prediction generated", data: prediction });
  } catch (error) {
    console.error("❌ Trigger error:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

/**
 * Get latest recommendation
 */
export const getLatestRecommendation = async (req, res) => {
  try {
    const { villageId } = req.params;
    const latestPrediction = await prisma.prediction.findFirst({
      where: { villageId },
      orderBy: { predictionTimestamp: "desc" },
    });

    if (!latestPrediction) {
      return res.status(404).json({ message: "No recommendations found" });
    }

    res.status(200).json(latestPrediction);
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Analytics for frontend graphs
 */
export const getPredictionStats = async (req, res) => {
  try {
    const counts = await prisma.prediction.groupBy({
      by: ["riskLevel"],
      _count: { riskLevel: true },
    });

    res.status(200).json({ stats: counts });
  } catch (error) {
    console.error("❌ Stats error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * === CRON JOB (Every 1 Minute) ===
 */
cron.schedule("0 * * * *", async () => {
  // every 1 minute
  console.log("🔄 Running prediction job...");
  try {
    const villages = await prisma.village.findMany();
    const today = new Date().toISOString().split("T")[0];

    for (const village of villages) {
      const inputData = {
        village_id: village.id,
        date: today,

        // Raw symptoms
        diarrhea_cases: village.diarrheaCases || 0,
        vomiting_cases: village.vomitingCases || 0,
        fever_cases: village.feverCases || 0,

        // Water quality
        ph_level: village.ph || 7,
        turbidity: village.turbidity || 1.0,
        tds: village.tds || 200,

        // Weather
        rainfall: village.rainfall || 0,
        temperature: village.temperature || 25,
        humidity: village.humidity || 60,

        // Season
        season: village.season || "monsoon",
      };

      await generatePredictionForVillage(village.id, inputData);
      console.log(`✅ Prediction generated for village: ${village.name}`);
    }
  } catch (err) {
    console.error("❌ Error running cron job:", err.message);
  }
});
