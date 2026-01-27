import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateDemoData() {
  try {
    const demoData = {
      pondId: 1,
      phValue: +(Math.random() * (8.5 - 6.5) + 6.5).toFixed(2),
      temperature: +(Math.random() * (30 - 20) + 20).toFixed(2),
      waterLevel: Math.random() < 0.5 ? "Low" : "High",
    };

    const result = await prisma.sensorData.create({
      data: demoData,
    });

    console.log("✅ Demo data inserted:", result);
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  }
}

// Run every 5 seconds
setInterval(() => {
  generateDemoData();
}, 500000);

// Optional: insert once immediately at start
generateDemoData();
