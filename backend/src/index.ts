import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { ErrorMiddleware } from './middleware/errorMiddleware';

import schoolRoutes from './modules/school/schoolRoutes';
import userRouter from './modules/user/userRoutes';

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'School Fee Management API is running',
  });
});

// Routes
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/users', userRouter);

// Global error middleware
app.use(ErrorMiddleware.handle);

export default app;