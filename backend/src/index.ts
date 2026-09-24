import express from "express";
import cors from "cors";
import helmet from "helmet";
import schoolRoutes from './modules/school/schoolRoutes';
import { ErrorMiddleware } from './middleware/errorMiddleware';

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


app.use('/api/schools', schoolRoutes);

app.use(ErrorMiddleware.handle);

export default app;