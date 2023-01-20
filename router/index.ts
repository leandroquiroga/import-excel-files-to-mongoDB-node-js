import { Router } from 'express';
import { getController } from '../controllers/index';

const router: Router = Router();

router.get('/', getController);

export {
  router
}