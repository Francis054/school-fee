import { Router } from 'express';
import { schoolController } from './schoolProvider';

const router = Router();

router.post('/create', (req, res, next) => {
  return schoolController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  return schoolController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return schoolController.findById(req, res, next);
});

router.patch('/:id', (req, res, next) => {
  return schoolController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  return schoolController.delete(req, res, next);
});

export default router;