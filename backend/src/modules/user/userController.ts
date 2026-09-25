import { NextFunction, Request, Response } from 'express';

import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { UserService } from './userService';
import { CreateUserDto } from './dtos/createUserDto';
import { UpdateUserDto } from './dtos/updateUserDto';
import { UserResource } from './userResource';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const school = await this.userService.createUser(req.body);

      return res.status(201).json(UserResource.transform(school));
    } catch (error) {
      console.error('Create user error:', error);

      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const school = await this.userService.getUserById(id);

      return res.status(200).json(UserResource.transform(school));
    } catch (error) {
      console.error('Get user error:', error);

      next(error);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const schools = await this.userService.getAllUser();

      return res
        .status(200)
        .json(schools.map((school) => UserResource.transform(school)));
    } catch (error) {
      console.error('Get user error:', error);

      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const school = await this.userService.updateUser(id, req.body);

      return res.status(200).json(UserResource.transform(school));
    } catch (error) {
      console.error('Update user error:', error);

      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await this.userService.deleteUser(id);

      return res.status(204).send();
    } catch (error) {
      console.error('Delete user error:', error);

      next(error);
    }
  }
}
