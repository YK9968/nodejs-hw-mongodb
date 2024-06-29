import { ContactsCollection } from '../db/models/contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  contactType,
  isFavourite,
}) => {
  const skip = (page - 1) * perPage;
  const dataBaseQuery = ContactsCollection.find();

  if (contactType) {
    dataBaseQuery.where('contactType').equals(contactType);
  }
  if (isFavourite) {
    dataBaseQuery.where('isFavourite').equals(isFavourite);
  }

  const data = await dataBaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollection.find()
    .merge(dataBaseQuery)
    .countDocuments();

  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    totalItems,
    page,
    perPage,
  });
  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactById = async (studentId) => {
  const student = await ContactsCollection.findById(studentId);
  return student;
};

export const addContact = async (body) => {
  const contact = await ContactsCollection.create(body);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      runValidators: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
