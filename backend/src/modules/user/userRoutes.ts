import { Router } from 'express';
import { userController } from './userProvider';
import { CreateUserDto } from './dtos/createUserDto';
import { validateDto } from '../../middleware/validateMiddleware';

const userRouter = Router();

userRouter.post('/create', validateDto(CreateUserDto), (req, res, next) => {
  return userController.create(req, res, next);
});

userRouter.get('/', (req, res, next) => {
  return userController.findAll(req, res, next);
});

userRouter.get('/:id', (req, res, next) => {
  return userController.findById(req, res, next);
});

userRouter.patch('/:id', validateDto(CreateUserDto),(req, res, next) => {
  return userController.update(req, res, next);
});

userRouter.delete('/:id', (req, res, next) => {
  return userController.delete(req, res, next);
});

export default userRouter;
