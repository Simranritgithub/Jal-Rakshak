// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// // ✅ Get active hotspots
// export const getActiveHotspots = async (req, res) => {
//   const { region, riskLevel, search } = req.query;

//   try {
//     let where = {
//       isAnomaly: true,
//       riskLevel: { in: ["MEDIUM", "HIGH"] }, // ✅ enum uppercase
//     };

//     if (search) {
//       where.village = {
//         name: { contains: search, mode: "insensitive" },
//       };
//     }

//     if (region) {
//       where.village = { ...where.village, regionId: region };
//     }

//     if (riskLevel) {
//       const normalizedRisk = riskLevel.toUpperCase(); // ✅ fix
//       where.riskLevel = normalizedRisk;
//     }

//     const hotspots = await prisma.prediction.findMany({
//       where,
//       include: {
//         village: {
//           select: { id: true, name: true, latitude: true, longitude: true },
//         },
//       },
//       orderBy: { predictionTimestamp: "desc" },
//     });

//     res.status(200).json(hotspots);
//   } catch (error) {
//     console.error("Error fetching hotspots:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Get hotspot details
// export const getHotspotDetails = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const hotspot = await prisma.prediction.findUnique({
//       where: { id },
//       include: {
//         village: {
//           include: {
//             region: { select: { name: true, language: true } },
//           },
//         },
//       },
//     });

//     if (
//       !hotspot ||
//       !hotspot.isAnomaly ||
//       !["MEDIUM", "HIGH"].includes(hotspot.riskLevel)
//     ) {
//       return res
//         .status(404)
//         .json({ message: "Hotspot not found or is no longer active" });
//     }

//     const recentCases = await prisma.case.findMany({
//       where: { villageId: hotspot.villageId },
//       orderBy: { date: "desc" },
//       take: 5,
//       include: { disease: { select: { name: true } } },
//     });

//     res.status(200).json({ ...hotspot, recentCases });
//   } catch (error) {
//     console.error("Error fetching hotspot details:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ✅ Fetch active hotspots & store in Hotspot table
export const getActiveHotspots = async (req, res) => {
  const { region, riskLevel, search, minProbability } = req.query;

  try {
    let where = {
       isAnomaly: true,
      riskLevel: { in: ["MEDIUM", "HIGH"] },
    };

    // ✅ Add probability threshold (default 0.6 if not provided)
    where.riskProbability = { gte: parseFloat(minProbability) || 0.6 };

    if (search) {
      where.village = {
        name: { contains: search, mode: "insensitive" },
      };
    }

    if (region) {
      where.village = { ...where.village, regionId: region };
    }

    if (riskLevel) {
      const normalizedRisk = riskLevel.toUpperCase();
      where.riskLevel = normalizedRisk;
    }

    const predictions = await prisma.prediction.findMany({
      where,
      include: {
        village: {
          select: { id: true, name: true, latitude: true, longitude: true },
        },
      },
      orderBy: { predictionTimestamp: "desc" },
    });

    // ✅ Sync into Hotspot table
    for (const p of predictions) {
      await prisma.hotspot.upsert({
        where: { id: p.id },
        update: {
          date: p.date,
          riskLevel: p.riskLevel,
          riskProbability: p.riskProbability,
          diseases: p.diseases,
          recommendation: p.recommendation,
          anomalyScore: p.anomalyScore,
          isAnomaly: p.isAnomaly,
          predictionTimestamp: p.predictionTimestamp,
          villageId: p.villageId,
        },
        create: {
          id: p.id,
          date: p.date,
          riskLevel: p.riskLevel,
          riskProbability: p.riskProbability,
          diseases: p.diseases,
          recommendation: p.recommendation,
          anomalyScore: p.anomalyScore,
          isAnomaly: p.isAnomaly,
          predictionTimestamp: p.predictionTimestamp,
          villageId: p.villageId,
        },
      });
    }

    res.status(200).json(predictions);
  } catch (error) {
    console.error("Error fetching hotspots:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get hotspot details (from Hotspot table instead of Prediction)
export const getHotspotDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const hotspot = await prisma.hotspot.findUnique({
      where: { id },
      include: {
        village: {
          include: {
            region: { select: { name: true, language: true } },
          },
        },
      },
    });

    if (
      !hotspot ||
      !hotspot.isAnomaly ||
      !["MEDIUM", "HIGH"].includes(hotspot.riskLevel)
    ) {
      return res
        .status(404)
        .json({ message: "Hotspot not found or is no longer active" });
    }

    const recentCases = await prisma.case.findMany({
      where: { villageId: hotspot.villageId },
      orderBy: { date: "desc" },
      take: 5,
      include: { disease: { select: { name: true } } },
    });

    res.status(200).json({ ...hotspot, recentCases });
  } catch (error) {
    console.error("Error fetching hotspot details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
