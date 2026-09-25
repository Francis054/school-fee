import { SchoolRepository } from './schoolRepository';
import { SchoolController } from './schoolController';
import { SchoolService } from './schoolSevice';

const schoolRepository = new SchoolRepository();

const schoolService = new SchoolService(schoolRepository);

export const schoolController = new SchoolController(schoolService);
