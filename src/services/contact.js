import { ContactsCollection } from '../db/models/contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  contactType,
  isFavourite,
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const dataBaseQuery = ContactsCollection.find();

  if (userId) {
    dataBaseQuery.where('userId').equals(userId);
  }
  if (contactType) {
    dataBaseQuery.where('contactType').equals(contactType);
  }
  if (isFavourite) {
    dataBaseQuery.where('isFavourite').equals(isFavourite);
  }

  const totalItems = await ContactsCollection.find()
    .merge(dataBaseQuery)
    .countDocuments();

  const data = await dataBaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

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

export const getContactById = async (filter) => {
  console.log(filter);
  const contact = await ContactsCollection.findOne(filter);
  return contact;
};

export const addContact = async (body) => {
  const contact = await ContactsCollection.create(body);
  return contact;
};

export const deleteContact = async (filter) => {
  const contact = await ContactsCollection.findOneAndDelete(filter);

  return contact;
};

export const updateContact = async (filter, payload, options = {}) => {
  console.log(filter);
  const rawResult = await ContactsCollection.findOneAndUpdate(filter, payload, {
    new: true,
    runValidators: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
