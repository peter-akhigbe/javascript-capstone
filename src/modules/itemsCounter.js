import loadShows from './shows.js';

export const countItems = async () => {
  const response = await loadShows();
  return response.length;
};

export const displayItemsCounter = async () => {
  const counts = await countItems();
  const showsCount = document.querySelector('.shows-count');
  showsCount.innerHTML = `TV Shows (${counts})`;
};