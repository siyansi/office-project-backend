import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBconnect from "./config/dt"; // Ensure the path is correct
import studentRoutes from "./routes/studentRoutes";
import userRoutes from "./routes/userRoutes";
import assignmentRoutes from "./routes/assignmentRoutes";
import classRecordRoutes from "./routes/classRecordRoutes";
import scoreCardRoutes from "./routes/scoreCardModals";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

// Database connection
DBconnect().catch((err: Error) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

// Routes
app.use("/auth/user", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/classrecords", classRecordRoutes);
app.use("/api/scorecards", scoreCardRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server (only for local development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app for Vercel
export default app;