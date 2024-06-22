import express from 'express';
import {
  addContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
const contactsRouters = express.Router();

contactsRouters.get('/', ctrlWrapper(getAllContactsController));

contactsRouters.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouters.post('/', ctrlWrapper(addContactController));

contactsRouters.delete('/:contactId', ctrlWrapper(deleteContactController));

contactsRouters.patch('/:contactId', ctrlWrapper(updateContactController));

export default contactsRouters;
