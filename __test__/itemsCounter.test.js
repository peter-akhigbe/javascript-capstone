import { countItems, displayItemsCounter } from '../src/modules/itemsCounter.js';

jest.mock('../src/modules/itemsCounter.js');

describe('Test All Items Count', () => {
  it('returns the correct number of items on the page', async () => {
    document.body.innerHTML = `
      <p class=show></p>
    `;

    const show = document.querySelector('.show');

    const data = countItems();

    displayItemsCounter(show, '.show');

    expect(data).toBe(6);
    expect(show.innerHTML).toBe('TV Shows (6)');
  });
});