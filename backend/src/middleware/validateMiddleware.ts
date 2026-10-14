import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { AppError } from '../errors/AppError';

export function validateDto(dtoClass: any) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const dto = plainToInstance(dtoClass, req.body);

    const errors = await validate(dto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error) => ({
        field: error.property,
        errors: Object.values(error.constraints ?? {}),
      }));

      return next(
        new AppError(
          'Validation failed',
          400,
          validationErrors,
        ),
      );
    }

    req.body = dto;

    next();
  };
}