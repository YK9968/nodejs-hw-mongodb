import express from 'express';
import {
  addContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import validateBody from '../utils/validateBody.js';
import {
  contactsAddShema,
  contactsUpdateShema,
} from '../validation/contacts.js';

const contactsRouters = express.Router();

contactsRouters.get('/', ctrlWrapper(getAllContactsController));

contactsRouters.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouters.post(
  '/',
  validateBody(contactsAddShema),
  ctrlWrapper(addContactController),
);

contactsRouters.patch(
  '/:contactId',
  validateBody(contactsUpdateShema),
  ctrlWrapper(updateContactController),
);

contactsRouters.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouters;
