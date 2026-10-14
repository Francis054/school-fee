import { NextFunction, Request, Response } from 'express';

import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CreateSchoolDto } from './dtos/createSchoolDto';
import { UpdateSchoolDto } from './dtos/updateSchoolDto';
import { SchoolService } from './schoolSevice';
import { SchoolResource } from './schoolResource';

export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(CreateSchoolDto, req.body);

      await validateOrReject(dto);

      const school = await this.schoolService.createSchool(dto);

      return res.status(201).json(SchoolResource.transform(school));
    } catch (error) {
      console.error('Create school error:', error);

      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const school = await this.schoolService.getSchoolById(id);

      return res.status(200).json(SchoolResource.transform(school));
    } catch (error) {
      console.error('Get school error:', error);

      next(error);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const schools = await this.schoolService.getAllSchools();

      return res
        .status(200)
        .json(schools.map((school) => SchoolResource.transform(school)));
    } catch (error) {
      console.error('Get schools error:', error);

      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const dto = plainToInstance(UpdateSchoolDto, req.body);

      await validateOrReject(dto);

      const school = await this.schoolService.updateSchool(id, dto);

      return res.status(200).json(SchoolResource.transform(school));
    } catch (error) {
      console.error('Update school error:', error);

      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await this.schoolService.deleteSchool(id);

      return res.status(204).send();
    } catch (error) {
      console.error('Delete school error:', error);

      next(error);
    }
  }
}
