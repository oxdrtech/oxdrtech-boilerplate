import { Router } from 'express';
import { signupAuthSchema } from '../domain/schemas/signup-auth.schema';
import { AuthController } from './auth.controller';
import { signinAuthSchema } from '../domain/schemas/signin-auth.schema';
import { validateSchema } from '../../../shared/middlewares/validateSchema.middleware';

const router = Router();

router.post('/signup', validateSchema({ body: signupAuthSchema }), AuthController.signup);
router.post('/signin', validateSchema({ body: signinAuthSchema }), AuthController.signin);

export { router };
