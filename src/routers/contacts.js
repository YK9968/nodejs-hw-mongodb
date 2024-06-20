import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
const contactsRouters = express.Router();

contactsRouters.get('/', ctrlWrapper(getAllContactsController));

contactsRouters.get('/:contactId', ctrlWrapper(getContactByIdController));

export default contactsRouters;
