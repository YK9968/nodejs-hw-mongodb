import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/contacts-constants.js';
import { SessionsCollection } from '../db/models/session.js';

export const createSession = async (userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  });
};
