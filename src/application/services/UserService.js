const User = require('../../domain/entities/User');
const { ObjectId } = require('mongodb');

class UserService {

  async createUser(userData, db) {
    const newUser = new User(userData.first_name, userData.last_name, userData.age, userData.phone_number, userData.address, userData.passId);
    const result = await db.collection('users').insertOne(newUser);
    return {
      ...newUser, 
      _id: result.insertedId // Inclure l'ID de l'utilisateur nouvellement créé
    };
  }

  async getUserById(id, db) {
    return await db.collection('users').findOne({ _id: ObjectId(id) });
  }

  async getAllUsers(db) {
    return await db.collection('users').find().toArray();
  }

  async updateUser(id, userData, db) {
    const result = await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: userData });
    return result;
  }

  async deleteUser(id, db) {
    return await db.collection('users').deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = new UserService();
