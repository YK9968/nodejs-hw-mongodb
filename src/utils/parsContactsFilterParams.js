import { typeList } from '../constants/contacts-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;

  if (!['false', 'true'].includes(value)) return;

  const parsedValue = Boolean(value);
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
