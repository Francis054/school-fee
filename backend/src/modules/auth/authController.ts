import { NextFunction, Request, Response } from 'express';

import { UserResource } from '../user/userResource';
import { AuthService } from './authService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authService.register(req.body);

      return res.status(201).json({
        message: 'User registered successfully',
        data: UserResource.transform(user),
      });
    } catch (error) {
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.authService.login(req.body);

      return res.status(200).json({
        message: 'Login successful',
        data: {
          user: UserResource.transform(result.user),
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async me(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await this.authService.me(
      req.userId!,
    );

    return res.status(200).json({
      message: 'Authenticated user',
      data: UserResource.transform(user),
    });
  } catch (error) {
    return next(error);
  }
}
}
