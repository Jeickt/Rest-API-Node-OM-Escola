import { Router } from 'express';

import photo from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/photo', loginRequired, photo.create);

export default router;
