const UserController = require('../../infrastructure/controllers/UserController');
const UserService = require('../../application/services/UserService');

jest.mock('../../application/services/UserService'); 

describe('UserController', () => {
  const mockRequest = (body = {}, params = {}) => ({
    body,
    params,
    db: {}, 
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test('createUser should create a new user', async () => {
    const req = mockRequest({
      first_name: 'John',
      last_name: 'Doe',
      age: 30,
      phone_number: '1234567890',
      address: '123 Main St',
      passId: ['test1', 'test2']
    });

    const res = mockResponse();

    const newUser = { first_name: 'John', last_name: 'Doe', age: 30, phone_number: '1234567890', address: '123 Main St', passId: ['test1', 'test2'] };

    UserService.createUser.mockResolvedValue(newUser);

    await UserController.createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  test('getUserById should return user', async () => {
    const req = mockRequest({}, { id: 'some-id' });
    const res = mockResponse();

    const mockUser = { id: 'some-id', first_name: 'John', last_name: 'Doe' };
    UserService.getUserById.mockResolvedValue(mockUser);

    await UserController.getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('getAllUsers should return all users', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const mockUsers = [{ first_name: 'John', last_name: 'Doe' }, { first_name: 'Jane', last_name: 'Doe' }];
    UserService.getAllUsers.mockResolvedValue(mockUsers);

    await UserController.getAllUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  test('updateUser should update user', async () => {
    const req = mockRequest({}, { id: 'some-id' });
    const res = mockResponse();

    UserService.updateUser.mockResolvedValue({ modifiedCount: 1 });

    await UserController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User updated' });
  });

  test('deleteUser should delete user', async () => {
    const req = mockRequest({}, { id: 'some-id' });
    const res = mockResponse();

    UserService.deleteUser.mockResolvedValue({ deletedCount: 1 });

    await UserController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted' });
  });
});
