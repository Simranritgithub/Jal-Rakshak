// backend/controllers/admin/water.controller.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all sensor data
  export const getSensorData = async (req, res) => {
    try {
      const data = await prisma.sensorData.findMany({
        orderBy: { timestamp: "desc" },
        take: 100,
      });

      res.status(200).json({
        success: true,
        data,
      });
    } catch (err) {
      console.error("❌ Error fetching sensor data:", err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch sensor data",
      });
    }
  };
