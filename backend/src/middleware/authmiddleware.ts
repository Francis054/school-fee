import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return secret;
}

const JWT_SECRET = getJwtSecret();

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Authentication required', 401);
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    throw new AppError('Invalid authorization format', 401);
  }

  let decoded: string | JwtPayload;
  try {
    decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }

  if (typeof decoded === 'string' || typeof decoded.userId !== 'number') {
    throw new AppError('Invalid token payload', 401);
  }

  req.userId = decoded.userId;
  next();
}
