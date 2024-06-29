const parsSortParams = ({ sortBy, sortOrder }, fieldList) => {
  const parsedSortOrder = ['asc', 'desc'].includes(sortOrder)
    ? sortOrder
    : 'asc';

  const parsedSortBy = fieldList.includes(sortBy) ? sortBy : '_id';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parsSortParams;
