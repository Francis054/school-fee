import { Router } from 'express';
import { validateDto } from '../../middleware/validateMiddleware';
import { authController } from './authProvider';
import { RegisterDto } from './dtos/registerDto';
import { LoginDto } from './dtos/loginDto';
import { authMiddleware } from '../../middleware/authmiddleware';

const authRoute = Router();

authRoute.post('/register', validateDto(RegisterDto), (req, res, next) => {
  return authController.register(req, res, next);
});

authRoute.post('/login', validateDto(LoginDto), (req, res, next) => {
  return authController.login(req, res, next);
});


authRoute.get('/me', authMiddleware, (req, res, next) => {
  return authController.me(req, res, next);
});
// authRoute.get('/me', authMiddleware, authController.me.bind(authController));

export default authRoute;
