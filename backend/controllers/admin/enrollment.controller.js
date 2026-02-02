import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import sendEmail from "../../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import user from "../../Models/User.js";
import watersample from "../../Models/Watersample.js";
import Ashaworker from "../../Models/Ashaworker.js";

export const getAdminDashboardData = async (req, res) => {
  try {

    // Count users
    const totalUsers = await user.countDocuments();

    const ashaWorkers = await user.countDocuments({ role: "Asha worker" });

    //const admins = await user.countDocuments({ role: "Admin" });
   const locations = await watersample.distinct("location");
   const totallocations=locations.length;
   const hotspots = await watersample.distinct("location",{status:"Unsafe"});
   const activeHotspots = hotspots.length;


    // Water sample stats
    const totalSamples = await watersample.countDocuments();
    const today=new Date();
    today.setHours(0,0,0,0);

    const unsafeSamplestoday = await watersample.countDocuments({
      status: "Unsafe",
      createdAt: { $gte: today }
    });

    // Latest samples
    const latestSamples = await watersample
      .find()
      .populate("collectedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          ashaWorkers,
          totallocations,
          totalSamples,
          activeHotspots,
          unsafeSamplestoday
        },
        latestSamples
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export const getPendingAshaWorkers = async (req, res) => {
  try {
    const { state, village } = req.query;

    // Base filter → only Pending profiles
    const filter = {
      status: "Pending"
    };

    // Apply optional filters
    if (village) {
      filter["location.village"] = village;
    } 
    else if (state) {
      filter["location.state"] = state;
    }

    const workers = await Ashaworker.find(filter)
      .populate("AshaworkerId", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: workers.length,
      workers
    });

  } catch (error) {
    console.error("Error fetching pending Asha Workers:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
// GET /api/asha/:id

export const getAshaWorkerById = async (req, res) => {
  try {
    const {id}=req.params;
    const worker = await Ashaworker.findById(id)
      .populate("AshaworkerId", "name email role");

    if (!worker) {
      return res.status(404).json({
        success:false,
        message:"Asha Worker not found"
      });
    }

    return res.status(200).json({
      success:true,
      worker
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
};
export const statusasha = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;   // "Approved" or "Rejected"

    // Validation
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const ashastatus = await Ashaworker.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("AshaworkerId", "name email role");

    if (!ashastatus) {
      return res.status(404).json({
        success: false,
        message: "Asha worker not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: `Asha worker ${status} successfully`,
      worker: ashastatus
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const getApproveAshaWorkers = async (req, res) => {
  try {
    const { state, village } = req.query;

    // Base filter → only Pending profiles
    const filter = {
      status: "Approved"
    };

    // Apply optional filters
    if (village) {
      filter["location.village"] = village;
    } 
    else if (state) {
      filter["location.state"] = state;
    }

    const workers = await Ashaworker.find(filter)
      .populate("AshaworkerId", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: workers.length,
      workers
    });

  } catch (error) {
    console.error("Error fetching pending Asha Workers:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


export const getPendingVolunteers = async (req, res) => {
    try {
        // 🛠️ UPDATE: Get filter criteria from query parameters
        const { stateId, villageId } = req.query;
        const filter = { user: { status: "PENDING_APPROVAL" }};

        // 🛠️ UPDATE: Apply filters
        if (villageId) {
            filter.village = { id: villageId };
        } else if (stateId) {
            filter.user = { 
                ...filter.user,
                region: { stateId: stateId }
            };
        }

        const volunteers = await prisma.volunteer.findMany({
            where: filter,
            select: {
                id: true, // Select volunteer ID
                contact: true,
                availability: true,
                skillsAndQualifications: true,
                experience: true,
                idCardUrl: true,
                village: true, // 🛠️ UPDATE: Select village
                user: { select: { id: true, name: true, email: true } } // Select user ID
            }
        });
        res.status(200).json(volunteers);
    } catch (error) {
        console.error("Error fetching pending Volunteers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


    // ✅ Update user status for ASHA workers and Volunteers
    // ✅ Update user status for ASHA Workers and Volunteers
  export const updateUserStatus = async (req, res) => {
      try {
        const { userId } = req.params; // could be employeeId for ASHA, id for Volunteer
        const { role, action } = req.body; // role = "ASHA" or "VOLUNTEER", action = "APPROVE"/"REJECT"
    
        // Validate role
        if (!["ASHA_WORKER", "VOLUNTEER"].includes(role)) {
          return res.status(400).json({ message: "Invalid role. Must be ASHA or VOLUNTEER." });
        }
    
        // Validate action
        let newStatus;
        if (action === "APPROVE") newStatus = "ACTIVE";
        else if (action === "REJECT") newStatus = "REJECTED";
        else return res.status(400).json({ message: "Invalid action. Must be APPROVE or REJECT." });
    
        let updatedUser;
    
        if (role === "ASHA_WORKER") {
          // First find the ASHA worker by employeeId
          const ashaWorker = await prisma.ashaWorker.findUnique({
            where: { employeeId: userId },
            include: { user: true }
          });
    
          if (!ashaWorker) {
            return res.status(404).json({ message: "ASHA Worker not found" });
          }
    
          // Update user status safely
          updatedUser = await prisma.user.update({
            where: { id: ashaWorker.userId },
            data: { status: newStatus }
          });
    
        } else if (role === "VOLUNTEER") {
          // Directly update using userId
          const volunteer = await prisma.volunteer.findUnique({
            where: { id: userId },
            include: { user: true }
          });
    
          if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
          }
    
          updatedUser = await prisma.user.update({
            where: { id: volunteer.userId },
            data: { status: newStatus }
          });
        }
    
        res.status(200).json({
          message: `${role} ${action.toLowerCase()}d successfully`,
          user: updatedUser,
        });
    
      } catch (error) {
        console.error("❌ Error updating user status:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
  };
  export const getHealthOfficialDetails = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const official = await prisma.healthOfficial.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              status: true,
              region: {
                select: {
                  id: true,
                  name: true,
                  state: { select: { name: true } }
                }
              }
            }
          }
        }
      });
  
      if (!official) {
        return res.status(404).json({ success: false, message: "Health Official not found" });
      }
  
      res.status(200).json({
        success: true,
        data: official
      });
    } catch (error) {
      console.error("Error fetching official details:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
 
  
  export const addHealthOfficial = async (req, res) => {
    try {
      const { name, email, contact, title, department, regionId } = req.body;
  
      // 1. --- Input Validation ---
      if (!name || !email || !contact || !title || !department || !regionId) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // 2. --- Check for Duplicates & Foreign Key Existence ---
      const existingUser = await prisma.user.findFirst({ where: { email } });
      if (existingUser) {
        return res
          .status(409) // 409 Conflict is more specific for existing resources
          .json({ message: "A user with this email address already exists" });
      }
  
      const regionExists = await prisma.region.findUnique({ where: { id: regionId } });
      if (!regionExists) {
          return res.status(404).json({ message: "The specified region does not exist." });
      }
  
      // 3. --- Generate & Hash Token for Password Setup ---
      const resetToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // Token is valid for 1 hour
  
      const hashedResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
  
      // 4. --- Database Transaction for Atomic Creation ---
      // This ensures both user and healthOfficial are created, or neither is.
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            name,
            email,
            role: "HEALTH_OFFICIAL",
            status: "PENDING_APPROVAL",
            resetToken: hashedResetToken, // Store the hashed token
            tokenExpiry,
            region: {
              connect: { id: regionId },
            },
          },
        });
  
        await tx.healthOfficial.create({
          data: {
            title,
            department,
            contact,
            user: {
              connect: { id: user.id },
            },
          },
        });
      });
  
      // 5. --- Send Professional Email Notification ---
      const resetUrl = `${process.env.CLIENT_URL}/set-password/${resetToken}`; // Send the original token
      const message = `
  Dear ${name},
  
  Greetings from the Ministry of Health and Family Welfare.
  
  You have been successfully registered as a Health Official in our Health Monitoring System. To activate your account and set your password, please click the secure link below:
  
  ${resetUrl}
  
  Please note: For security purposes, this link is valid for only one hour. If you do not set your password within this time, please contact the system administrator.
  
  Do not share this link with anyone.
  
  Thank you for your valuable contribution to public health.
  
  Warm regards,
  Ministry of Health and Family Welfare
  Government of India
  `;
  
      await sendEmail({
        to: email,
        subject: "Account Activation - Health Official Portal",
        text: message,
      });
  
      // 6. --- Send Success Response ---
      res
        .status(201)
        .json({ message: "Health Official added successfully. An activation email has been sent." });
  
    } catch (error) {
      console.error("Error adding health official:", error);
      // Add more specific error handling if needed, e.g., checking for Prisma error codes
      res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
  };
  export const setPassword = async (req, res) => {
    try {
      const { resetToken, password } = req.body;
  
      if (!resetToken || !password) {
        return res
          .status(400)
          .json({ message: "Token and password are required" });
      }
  
      // 2. Hash the incoming token from the request body
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
  
      // 3. Find the user using the HASHED token
      const user = await prisma.user.findFirst({
        where: {
          resetToken: hashedToken, // Use the hashed token for the lookup
          tokenExpiry: { gte: new Date() }, // Check if the token has not expired
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token. Please request a new link." });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update user record and clear the token fields
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          tokenExpiry: null,
          status: "ACTIVE", // Activate the user's account
        },
      });
  
      res
        .status(200)
        .json({ message: "Password set successfully! You can now log in." });
    } catch (error) {
      console.error("Error setting password:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getAllRegions = async (req, res) => {
  try {
    const regions = await prisma.region.findMany({
      select: { id: true, name: true } // only id and name
    });

    res.status(200).json({ success: true, data: regions });
  } catch (error) {
    console.error("Error fetching regions:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};