const UserService = require('../../application/services/UserService'); // Import du service

// CRUD pour les utilisateurs
const createUser = async (req, res) => {
  try {
    const { first_name, last_name, age, phone_number, address, passId = [] } = req.body;

    const userPassIds = Array.isArray(passId) ? passId : [];

    // Validation des champs
    if (!first_name || !last_name || !age || !phone_number || !address) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const newUser = await UserService.createUser({
      first_name: first_name,
      last_name: last_name,
      age,
      phone_number: phone_number,
      address,
      passId: userPassIds,
    }, req.db);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id, req.db);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers(req.db);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await UserService.updateUser(req.params.id, req.body, req.db);
    if (result.modifiedCount === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await UserService.deleteUser(req.params.id, req.db);
    if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });
    res.status(204).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser };
