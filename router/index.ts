import { Router } from 'express';
import { postUpLoadFileDB, getFileDB } from '../controllers/index';

const router: Router = Router();

router.get('/data', getFileDB);
router.post('/upload', postUpLoadFileDB);

export {
  router
}