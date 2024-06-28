const calcPaginationData = ({ totalItems, page, perPage }) => {
  const total = Math.ceil(totalItems / perPage);
  const hasNextPage = page !== total;
  const hasPreviousPage = page !== 1;

  return {
    total,
    hasNextPage,
    hasPreviousPage,
  };
};

export default calcPaginationData;
