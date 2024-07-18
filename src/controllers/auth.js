import {
  loginUser,
  logoutUser,
  registerUser,
  requestResetToken,
} from '../services/auth.js';
import { ONE_MONTH } from '../constants/contacts-constants.js';
import { createSession, refreshUsersSession } from '../services/session.js';
import { resetPassword } from '../services/auth.js';
import {
  generateAuthUrl,
  getGoogleAuthName,
  validateGoogleOAuthCode,
} from '../utils/googleOAuth2.js';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const data = { name: user.name, email: user.email };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  console.log(req.cookies.sessionId);
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();

  return res.json({
    status: 200,
    message: 'Google OAuth url generate successfully',
    data: {
      url,
    },
  });
};

export const authGoogleController = async (req, res) => {
  const { code } = req.body;

  const ticket = validateGoogleOAuthCode(code);
  const userPayload = (await ticket).getPayload();

  if (!userPayload) {
    throw createHttpError(401);
  }

  let user = await UsersCollection.findOne({ email: userPayload.email });

  if (!user) {
    const registerData = {
      name: getGoogleAuthName(userPayload),
      email: userPayload.email,
      password: randomBytes(10),
    };

    user = await registerUser(registerData);
  }

  const session = await createSession(user._id);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
