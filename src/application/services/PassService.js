const Pass = require('../../domain/entities/Pass');
const { ObjectId } = require('mongodb');

class PassService {
  async createPass(passData, db) {
    const newPass = new Pass(passData.level);
    const result = await db.collection('passes').insertOne(newPass);
    return {
      ...newPass, 
      _id: result.insertedId // Inclure l'ID du pass nouvellement créé
    };
  }

  async getPassById(id, db) {
    return await db.collection('passes').findOne({ _id: ObjectId(id) });
  }

  async getAllPasses(db) {
    return await db.collection('passes').find().toArray();
  }

  async updatePass(id, passData, db) {
    passData.updatedAt = new Date();
    const result = await db.collection('passes').updateOne({ _id: ObjectId(id) }, { $set: passData });
    return result;
  }

  async deletePass(id, db) {
    return await db.collection('passes').deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = new PassService();
