import multer from 'multer';

import { TEMP_UPLOAD_DIR } from '../constants/contacts-constants.js';

const storage = multer.diskStorage({
  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniquePreffix = Date.now();
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
