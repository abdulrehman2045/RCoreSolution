import { Router } from 'express';
import { createUser, deleteUser, listUsers, updateUser } from '../controllers/usersController.js';
import { adminOnly } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../validators/userValidators.js';

const router = Router();

router.use(...adminOnly);

router.get('/', listUsers);
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
