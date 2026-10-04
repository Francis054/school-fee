import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppError } from '../../errors/AppError';
import { UserRepository } from '../user/userRepository';
import { RegisterDto } from './dtos/registerDto';
import { LoginDto } from './dtos/loginDto';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: RegisterDto) {
    // 1. Check that passwords match
    if (data.password !== data.confirmedPassword) {
      throw new AppError('Passwords do not match', 400);
    }

    // 2. Check whether the email is already registered
    const existingUser = await this.userRepository.findByEmail(
      data.emailAddress,
    );

    if (existingUser) {
      throw new AppError('Email address is already registered', 409);
    }

    // 3. Hash the password
    const hashedPassword = await hash(data.password, 12);

    // 4. Create the user
    const user = await this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.emailAddress);

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const passwordMatches = await compare(data.password, user.password);

    if (!passwordMatches) {
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        status: user.status,
      },
      accessToken,
    }; 
  }

  async me(userId: number) {
  const user = await this.userRepository.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
}
}
