const countItems = () => {
  const response = [
    { id: 1, name: 'Under the dome' },
    { id: 2, name: 'Person of interest' },
    { id: 3, name: 'Bitten' },
    { id: 4, name: 'Arrow' },
    { id: 5, name: 'True Detective' },
    { id: 6, name: 'The 100' },
  ];

  return response.length;
};

const displayItemsCounter = (showCounts, element) => {
  const counts = countItems();
  showCounts = document.querySelector(element);
  showCounts.innerHTML = `TV Shows (${counts})`;
};

export { countItems, displayItemsCounter };