import { Router } from 'express';
import { signInSchema, signUpSchema } from '../schemas';
import { validateBody } from '../middlewares';
import { signIn, singUp } from '../controllers';

const authRouter = Router();

authRouter.post('/signup', validateBody(signUpSchema), singUp).post('/signin', validateBody(signInSchema), signIn);

export { authRouter };
