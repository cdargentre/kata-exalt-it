const UserService = require('../../application/services/UserService');
const { ObjectId } = require('mongodb');

// Mock de la base de données
const mockDb = {
  collection: jest.fn().mockReturnThis(),
  insertOne: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn().mockReturnThis(),
  toArray: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
  });

  test('createUser should insert a new user', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      age: 30,
      phone_number: '1234567890',
      address: '123 Main St',
      passId: null,
    };

    // Mocking insertOne response
    mockDb.insertOne.mockResolvedValueOnce({
      ops: [{ _id: new ObjectId(), ...userData }],
    });

    const result = await UserService.createUser(userData, mockDb);
    expect(result).toMatchObject(userData); // Vérifie que le résultat correspond à l'utilisateur créé
  });

  test('getUserById should return user by id', async () => {
    const userId = new ObjectId();
    const mockUser = { _id: userId, first_name: 'John', last_name: 'Doe' };

    mockDb.findOne.mockResolvedValueOnce(mockUser);

    const user = await UserService.getUserById(userId, mockDb);
    expect(user).toMatchObject(mockUser);
  });

  test('getAllUsers should return all users', async () => {
    const mockUsers = [
      { first_name: 'John', last_name: 'Doe' },
      { first_name: 'Jane', last_name: 'Doe' },
    ];

    mockDb.toArray.mockResolvedValueOnce(mockUsers);

    const users = await UserService.getAllUsers(mockDb);
    expect(users).toEqual(mockUsers);
  });

  test('updateUser should update user data', async () => {
    const userId = new ObjectId();
    const userData = { first_name: 'John', last_name: 'Smith' };

    mockDb.updateOne.mockResolvedValueOnce({ modifiedCount: 1 });

    const result = await UserService.updateUser(userId, userData, mockDb);
    expect(result.modifiedCount).toBe(1);
  });

  test('deleteUser should delete user by id', async () => {
    const userId = new ObjectId();

    mockDb.deleteOne.mockResolvedValueOnce({ deletedCount: 1 });

    const result = await UserService.deleteUser(userId, mockDb);
    expect(result.deletedCount).toBe(1);
  });
});
