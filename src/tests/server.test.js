const { getDB } = require('./__mocks__/db');

jest.mock('./__mocks__/db');

describe('Server Tests', () => {
  beforeEach(() => {
    getDB().collection.mockClear();
  });

  it('should initialize correctly', async () => {
    // On teste que la DB est accessible
    const db = getDB();
    expect(db).toBeDefined();
  });

});
