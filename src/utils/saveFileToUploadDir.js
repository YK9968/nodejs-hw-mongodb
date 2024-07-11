import fs from 'node:fs/promises';
import path from 'node:path';
import {
  TEMP_UPLOAD_DIR,
  UPLOAD_DIR,
} from '../constants/contacts-constants.js';
import { env } from '../utils/env.js';

const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};

export default saveFileToUploadDir;
