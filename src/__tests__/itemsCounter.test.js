import countItems from '../modules/itemsCounter.js';

jest.mock('../modules/itemsCounter.js');

describe('Test All Items Count', () => {
  it('returns the correct number of items on the page', async () => {
    // Arrange
    const data = await countItems();
    // Act
    const len = data.length;
    // Assert
    expect(len).toBe(6);
  });
});