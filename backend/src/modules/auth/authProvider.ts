import { UserRepository } from '../user/userRepository';
import { AuthController } from './authController';
import { AuthService } from './authService';


const userRepository = new UserRepository();

const authService = new AuthService(userRepository);

export const authController = new AuthController(authService);
