import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


// Import routes
import authRoutes from "./routes/admin/auth.routes.js";
 import enrollmentRoutes from "./routes/admin/enrollment.routes.js";
 import waterroutes from "./routes/admin/water.routes.js";
 import ashawaterroutes from "./routes/Ashaworker/water.routes.js";
 import ashaalerts from "./routes/Ashaworker/alert.routes.js"
 
// import hotspotroutes from "./routes/Ashaworker/hotspot.routes.js";
// import healthroutes from "./routes/admin/health.routes.js";
// import locationroutes from "./routes/admin/managelocation.routes.js";
 import alertRoutes from "./routes/admin/alert.routes.js";
// import { translateText } from './controllers/translation.controller.js';
// import therapistRoutes from "./routes/healthofficial/therapist.routes.js"
import { connectDB } from "./Config/db.js";
import { globalErrorHandler } from "./utils/globalerr.js";
// Load environment variables
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend Vite dev URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);
// Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Admin Routes

 app.use("/api/enroll", enrollmentRoutes);
app.use("/api/auth", authRoutes);
 app.use('/api/water', waterroutes);
 app.use('/api/asha', ashawaterroutes);
 app.use('/api/asha',ashaalerts);
// app.use("/api/hotspot", hotspotroutes);
// app.use("/api/health", healthroutes);
// app.use("/api/location", locationroutes);
 app.use('/api/alerts', alertRoutes);
// app.post('/api/translate', translateText);
// // health routes 
// app.use('/api/ai', therapistRoutes);

// Simple health check route
app.use(globalErrorHandler);
app.get("/", (req, res) => {
  res.send("Aquasentials API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
