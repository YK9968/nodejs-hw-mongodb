import { Router } from 'express';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import validateBody from '../utils/validateBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default authRouter;
