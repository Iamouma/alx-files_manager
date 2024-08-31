import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/connect', basicAuthenticate, AuthController.getConnect);
router.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);
router.get('/users/me', xTokenAuthenticate, UsersController.getMe);

export default router;
