import { UserController } from './userController';
import { UserRepository } from './userRepository';
import { UserService } from './userService';

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

export const userController = new UserController(userService);
