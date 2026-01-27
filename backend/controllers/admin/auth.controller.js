import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import twilio from "twilio";
import axios from "axios"; // For HTTP requests

const prisma = new PrismaClient();
export const registerUser = async (req, res) => {
  const { name, role, regionId, profileData = {} } = req.body;

  // Allowed roles
  const allowedRoles = ["ASHA_WORKER", "VILLAGER", "VOLUNTEER"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `This endpoint is not for registering a ${role}.`,
    });
  }

  // Mandatory fields
  if (!name || !profileData.contact) {
    return res.status(400).json({
      success: false,
      message: "Please provide name and contact number.",
    });
  }

  try {
    const newUser = await prisma.$transaction(async (tx) => {
      // Determine status based on role
      const status = role === "VILLAGER" ? "ACTIVE" : "PENDING_APPROVAL";

      // Create User without email/password
      const user = await tx.user.create({
        data: {
          name,
          role,
          regionId,
          status,
        },
      });

      let profileRecord;

      // Create profile based on role
      switch (role) {
        case "ASHA_WORKER":
          if (!profileData.employeeId) {
            throw new Error("Employee ID is required for ASHA_WORKER.");
          }
          profileRecord = await tx.ashaWorker.create({
            data: { userId: user.id, ...profileData },
          });
          break;

        case "VOLUNTEER":
          profileRecord = await tx.volunteer.create({
            data: { userId: user.id, ...profileData },
          });
          break;

        case "VILLAGER":
          profileRecord = await tx.villager.create({
            data: { userId: user.id, ...profileData },
          });
          break;
      }

      return { user, profileRecord };
    });

    // Build profile object dynamically
    const profileResponse = { ...profileData };

    res.status(201).json({
      success: true,
      message:
        role === "VILLAGER"
          ? "Registration successful. User is ACTIVE."
          : "Registration successful. Your account is pending admin approval.",
      data: {
        id: newUser.user.id,
        name: newUser.user.name,
        role,
        status: newUser.user.status,
        profile: profileResponse,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};






// Generate 6-digit OTP
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

// ---------------------
// Helper: Generate 6-digit OTP
// ---------------------
export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ---------------------
// Helper: Send SMS via Twilio with language support
// ---------------------
export const sendSMS = async (phone, otp, language = "en") => {
  try {
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    // Translate message based on language
    let messageBody;
    switch (language) {
      case "hi":
        messageBody = `आपका Smart Health Monitoring System OTP ${otp} है। यह 5 मिनट के लिए मान्य है।`;
        break;
      case "as":
        messageBody = `আপোনাৰ Smart Health Monitoring System OTP হৈছে ${otp}. ই ৫ মিনিটৰ বাবে বৈধ।`;
        break;
      case "mni":
        messageBody = `ꯑꯦꯛꯇ Smart Health Monitoring System OTP ${otp} ꯍꯧꯗꯒꯤ. ꯑꯃꯥ 5 ꯃꯤꯅꯠꯇ ꯃꯇꯝ ꯑꯃꯥꯡꯒꯤ।`;
        break;
      case "mizo":
        messageBody = `I OTP a ni a, Smart Health Monitoring System-ah ${otp} a ni a. Chu chu 5 min thleng a hman a ngai.`;
        break;
      default:
        messageBody = `Your Smart Health Monitoring System OTP is ${otp}. It is valid for 5 minutes.`;
    }

    const message = await client.messages.create({
      body: messageBody,
      from: TWILIO_PHONE,
      to: formattedPhone,
    });

    console.log("✅ OTP sent via Twilio:", message);
  } catch (err) {
    console.error("❌ Twilio SMS sending failed:", err.message);
    throw new Error("Failed to send OTP via Twilio");
  }
};

// ---------------------
// Login Controller


export const loginUser = async (req, res) => {
  try {
    const { email, password, contact, otp } = req.body;

    // Step 1: Identify user
    let user = null;
    if (email) {
      user = await prisma.user.findFirst({ where: { email } }); // <-- FIXED
    } else if (contact) {
      user = await prisma.user.findFirst({ where: { contact } }); // <-- FIXED
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Step 2: Role-based login
    if (user.role === "ADMIN" || user.role === "HEALTH_OFFICIAL") {
      if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
    } 
    else if (["ASHA_WORKER", "VILLAGER", "VOLUNTEER"].includes(user.role)) {
      if (!otp) {
        return res.status(400).json({ success: false, message: "OTP is required" });
      }

      // TODO: Replace this with your OTP verification logic
      if (otp !== "123456") {
        return res.status(401).json({ success: false, message: "Invalid OTP" });
      }
    } 
    else {
      return res.status(400).json({ success: false, message: "Invalid role for login" });
    }

    // Step 3: Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Step 4: Send Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("❌ Error logging in user:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

      await prisma.user.update({
        where: { email },
        data: { resetToken: hashedToken, tokenExpiry: expiresAt },
      });

      const resetUrl = `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/reset-password/${resetToken}`;
      await sendPasswordResetEmail({
        to: user.email,
        url: resetUrl,
        name: user.name,
      });
    }
    res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

/**
 * @desc    Resets a user's password using a token.
 * @route   PUT /api/auth/resetpassword/:token
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: { resetToken: hashedToken, tokenExpiry: { gt: new Date() } },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null, // Clear the token after use
        tokenExpiry: null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, role: true, status: true },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
