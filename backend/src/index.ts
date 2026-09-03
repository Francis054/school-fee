import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "School Fee Management API is running",
  });
});

export default app;