const mockCollection = {
    insertMany: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    deleteMany: jest.fn(),
    updateOne: jest.fn(),
  };
  
  const mockDB = {
    collection: jest.fn(() => mockCollection),
  };
  
  const getDB = jest.fn(() => mockDB);
  
  module.exports = { getDB, mockDB };
  