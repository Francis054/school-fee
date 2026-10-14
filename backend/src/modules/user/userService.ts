import { AppError } from '../../errors/AppError';
import { CreateUserDto } from './dtos/createUserDto';
import { UserRepository } from './userRepository';
import { UpdateUserDto } from './dtos/updateUserDto';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(
      data.emailAddress,
    );

    if (existingUser) {
      throw new AppError('A user with this email already exists', 409);
    }

    return this.userRepository.create(data);
  }

  async getUserById(id: number) {
    const school = await this.userRepository.findById(id);

    if (!school) {
      throw new AppError('User not found', 404);
    }

    return school;
  }

  async getAllUser() {
    return this.userRepository.findAll();
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const school = await this.userRepository.findById(id);

    if (!school) {
      throw new AppError('User not found', 404);
    }

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    const school = await this.userRepository.findById(id);

    if (!school) {
      throw new AppError('User not found', 404);
    }

    return this.userRepository.delete(id);
  }
}
