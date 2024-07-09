import nodemailer from 'nodemailer';

import 'dotenv/config';
import { SMTP } from '../constants/contacts-constants.js';
import { env } from './env.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  secure: false,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    const send = await transporter.sendMail(options);
    return send;
  } catch (err) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
