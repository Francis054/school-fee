import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { AppError } from '../errors/AppError';

export class ErrorMiddleware {
  static handle(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.error(error);

    // Our expected application errors
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    // Unexpected errors
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}