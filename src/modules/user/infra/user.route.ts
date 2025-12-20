import { Router } from 'express';
import { UserController } from './user.controller';
import { createUserSchema } from '../domain/schemas/create-user.schema';
import { authGuard } from '../../../shared/guards/auth.guard';
import { userGuard } from '../../../shared/guards/user.guard';
import { updateUserSchema } from '../domain/schemas/update-user.schema';
import { validateSchema } from '../../../shared/middlewares/validateSchema.middleware';

const router = Router();

router.post('/', authGuard("ADMIN"), validateSchema({ body: createUserSchema }), UserController.create);
router.get('/me', authGuard("ALL"), UserController.me);
router.get('/', authGuard("ADMIN"), UserController.list);
router.get('/:id', authGuard("ADMIN"), UserController.find);
router.put('/:id', authGuard("ALL"), userGuard("id"), validateSchema({ body: updateUserSchema }), UserController.update);
router.delete('/:id', authGuard("ALL"), userGuard("id"), UserController.delete);
router.put('/restore/:id', authGuard("ALL"), userGuard("id"), UserController.restore);

export { router };
