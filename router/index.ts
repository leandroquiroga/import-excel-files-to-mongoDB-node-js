import { Router } from 'express';
import { postUpLoadFileDB, getFileDB, getFileByIdDB, getFileByZoneDB } from '../controllers/index';

const router: Router = Router();

router.get('/data', getFileDB);

router.get('/data/:code', getFileByIdDB);

router.get('/data/:zone/:province', getFileByZoneDB);

router.post('/upload', postUpLoadFileDB);

export {
  router
}