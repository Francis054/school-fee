

import { db } from '../../prisma/db';
import { SchoolInterface } from './schoolInterface';

export class SchoolRepository {
  async create(data: SchoolInterface) {
    return db.orm.public.School.create({
      name: data.name,
      address: data.address,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      logoUrl: data.logoUrl,
      currency: data.currency,
      verified: data.verified ?? false,
    });
  }

  async findById(id: number) {
    return db.orm.public.School.where({ id }).first();
  }

  async findByEmail(emailAddress: string) {
    return db.orm.public.School.where({
      emailAddress,
      deletedAt: null,
    }).first();
  }

  async findAll() {
    return db.orm.public.School.where({
      deletedAt: null,
    })
      .orderBy((school) => school.createdAt.desc())
      .all();
  }

  async update(id: number, data: Partial<SchoolInterface>) {
    return db.orm.public.School.where({ id }).update(data);
  }

  async softDelete(id: number) {
    return db.orm.public.School.where({ id }).update({
      deletedAt: new Date(),
    });
  }
}
