import { SchoolRepository } from './schoolRepository';
import { CreateSchoolDto } from './dtos/createSchoolDto';
import { UpdateSchoolDto } from './dtos/updateSchoolDto';
import { AppError } from '../../errors/AppError';

export class SchoolService {
  constructor(private readonly schoolRepository: SchoolRepository) {}

  async createSchool(data: CreateSchoolDto) {
    const existingSchool = await this.schoolRepository.findByEmail(
      data.emailAddress,
    );

    if (existingSchool) {
      throw new AppError('A school with this email already exists', 409);
    }

    return this.schoolRepository.create(data);
  }

  async getSchoolById(id: number) {
    const school = await this.schoolRepository.findById(id);

    if (!school) {
      throw new AppError('School not found', 404);
    }

    return school;
  }

  async getAllSchools() {
    return this.schoolRepository.findAll();
  }

  async updateSchool(id: number, data: UpdateSchoolDto) {
    const school = await this.schoolRepository.findById(id);

    if (!school) {
      throw new AppError('School not found', 404);
    }

    return this.schoolRepository.update(id, data);
  }

  async deleteSchool(id: number) {
    const school = await this.schoolRepository.findById(id);

    if (!school) {
      throw new AppError('School not found', 404);
    }

    return this.schoolRepository.delete(id);
  }
}
