import { typeList } from '../constants/contacts-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;

  if (!['true', 'false'].includes(value)) return;

  const parsedValue = value.toLowerCase() === 'true';

  return parsedValue;
};

const parsContactsFilterParams = ({ contactType, isFavourite }) => {
  const parsedTypeFilter = typeList.includes(contactType) ? contactType : null;
  const parsedFavouriteFilter = parseBoolean(isFavourite);

  return {
    contactType: parsedTypeFilter,
    isFavourite: parsedFavouriteFilter,
  };
};

export default parsContactsFilterParams;
