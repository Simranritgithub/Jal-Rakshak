import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const prisma = new PrismaClient();
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const createAlert = async (req, res) => {
  try {
    const { title, message, target, regionId, sentBy } = req.body;

    // 1️⃣ Save alert to DB
    const alert = await prisma.alert.create({
      data: { title, message, target, regionId, sentBy },
    });

    // 2️⃣ Find recipients
    const users = target === "ALL"
      ? await prisma.user.findMany({ where: { regionId } })
      : await prisma.user.findMany({ where: { regionId, role: target } });

    // 3️⃣ Create notifications for users
    if (users.length > 0) {
      const notifications = users.map(u => ({ userId: u.id, alertId: alert.id }));
      await prisma.userNotification.createMany({
        data: notifications,
        skipDuplicates: true,
      });
    }

    // 4️⃣ Emit WebSocket event if socket exists
    if (req.io) req.io.emit("newAlert", { alert });

    // 5️⃣ Send SMS via Twilio (trial-safe)
    for (let u of users) {
      if (!u.phone) {
        console.log(`❌ User ${u.id} has no phone number`);
        continue;
      }

      const formattedPhone = u.phone.startsWith("+") ? u.phone : `+91${u.phone}`;
      const fromPhone = process.env.TWILIO_PHONE.replace(/\s+/g, "");

      try {
        const sms = await client.messages.create({
          body: `ALERT: ${title} - ${message}`,
          from: fromPhone,
          to: formattedPhone,
        });
        console.log(`✅ SMS sent to ${formattedPhone}: ${sms.sid}`);
      } catch (err) {
        console.error(`❌ SMS failed for user ${u.id} (${formattedPhone}): ${err.message}`);
        // For trial accounts, likely cause: number not verified
      }
    }

    res.status(201).json({ message: "Alert created successfully", alert });

  } catch (err) {
    console.error("Error creating alert:", err);
    res.status(500).json({ error: "Failed to create alert" });
  }
};

// GET all alerts
export const getAlerts = async (req, res) => {
  try {
    const { regionId, userId } = req.query;

    // Fetch alerts optionally filtered by region
    const alerts = await prisma.alert.findMany({
      where: regionId ? { regionId } : {},
      include: {
        userNotifications: userId
          ? { where: { userId } } // only notifications for this user
          : true, // all notifications
      },
      orderBy: { createdAt: "desc" }, // latest first
    });

    res.status(200).json({ alerts });
  } catch (err) {
    console.error("Error fetching alerts:", err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};