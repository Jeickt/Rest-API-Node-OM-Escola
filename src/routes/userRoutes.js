import { Router } from 'express';
import user from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// router.get('/users', user.index);
// router.get('/users/:id', user.show);
router.post('/users', user.create);
router.put('/users/', loginRequired, user.update);
router.delete('/users/', loginRequired, user.delete);

export default router;
