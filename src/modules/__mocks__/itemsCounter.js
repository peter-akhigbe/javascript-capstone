const countItems = () => {
  const response = Promise.resolve([
    { id: 1, name: 'Under the dome' },
    { id: 2, name: 'Person of interest' },
    { id: 3, name: 'Bitten' },
    { id: 4, name: 'Arrow' },
    { id: 5, name: 'True Detective' },
    { id: 6, name: 'The 100' },
  ]);

  return response;
};

export default countItems;