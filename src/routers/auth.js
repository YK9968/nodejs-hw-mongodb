import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  userGoogleAuthCodeSchema,
} from '../validation/auth.js';
import {
  getGoogleOAuthUrlController,
  authGoogleController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import validateBody from '../utils/validateBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/get-auth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-google-auth',
  validateBody(userGoogleAuthCodeSchema),
  ctrlWrapper(authGoogleController),
);

export default authRouter;
