import { db } from '../../prisma/db';
import { UpdateSchoolDto } from '../school/dtos/updateSchoolDto';
import { CreateUserDto } from './dtos/createUserDto';

export class UserRepository {
  async create(data: CreateUserDto) {
    return db.orm.public.User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
    });
  }

  async findById(id: number) {
    return db.orm.public.User.where({ id }).first();
  }

  async findByEmail(emailAddress: string) {
    return db.orm.public.User.where({
      emailAddress,
      deletedAt: null,
    }).first();
  }

  async findAll() {
    return db.orm.public.User.where({
      deletedAt: null,
    })
      .orderBy((school) => school.createdAt.asc())
      .all();
  }

  async update(id: number, data: Partial<UpdateSchoolDto>) {
    return db.orm.public.User.where({ id }).update(data);
  }
  async delete(id: number) {
    return db.orm.public.User.where({ id }).delete();
  }
}
