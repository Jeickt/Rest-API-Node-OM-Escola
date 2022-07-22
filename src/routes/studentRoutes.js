import { Router } from 'express';
import student from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/students', student.index);
router.get('/students/:id', student.show);
router.post('/students', loginRequired, student.create);
router.put('/students/:id', loginRequired, student.update);
router.delete('/students/:id', loginRequired, student.delete);

export default router;
