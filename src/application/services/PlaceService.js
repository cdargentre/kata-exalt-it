const Place = require('../../domain/entities/Place');
const { ObjectId } = require('mongodb');

class PlaceService {
  async createPlace(placeData, db) {
    const newPlace = new Place(
      placeData.address,
      placeData.phone_number,
      placeData.requiredPassLevel,
      placeData.requiredAgeLevel
    );
    const result = await db.collection('places').insertOne(newPlace);
    return {
      ...newPlace, 
      _id: result.insertedId // Inclure l'ID de la place nouvellement créée
    };
  }

  async getPlaceById(id, db) {
    return await db.collection('places').findOne({ _id: ObjectId(id) });
  }

  async getAllPlaces(db) {
    return await db.collection('places').find().toArray();
  }

  async updatePlace(id, placeData, db) {
    const result = await db.collection('places').updateOne({ _id: ObjectId(id) }, { $set: placeData });
    return result;
  }

  async deletePlace(id, db) {
    return await db.collection('places').deleteOne({ _id: ObjectId(id) });
  }

  // Vérifier si un utilisateur a accès à une place
  async checkUserAccess(userId, placeId, db) {
    // Récupérer l'utilisateur
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) {
      throw new Error('User not found');
    }

  // Récupérer la place
  const place = await db.collection('places').findOne({ _id: ObjectId(placeId) });
  if (!place) {
    throw new Error('Place not found');
  }

  // Vérifier si l'utilisateur a des passes et si l'un d'eux satisfait les critères
  if (user.pass_ids && user.pass_ids.length > 0) {
    // Récupérer les passes de l'utilisateur
    const userPasses = await db.collection('passes').find({ _id: { $in: user.pass_ids.map(id => ObjectId(id)) } }).toArray();

    // Vérifier si au moins un pass satisfait aux critères
    const hasAccess = userPasses.some(pass => pass.level >= place.required_pass_level && user.age >= place.required_age_level);

    if (hasAccess) {
      return true; // Accès accordé
    }
  }

  return false; // Accès refusé
  }

  // Mthode : Obtenir la liste des places accessibles par un utilisateur
  async getAccessiblePlacesForUser(userId, db) {
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier si l'utilisateur a des passes
    if (!user.pass_ids || user.pass_ids.length === 0) {
      return []; // Aucun accès si pas de pass
    }

    // Récupérer tous les passes de l'utilisateur
    const userPasses = await db.collection('passes').find({ _id: { $in: user.pass_ids.map(id => ObjectId(id)) } }).toArray();

    if (!userPasses || userPasses.length === 0) {
      return []; // Aucun accès si pas de pass valide
    }

    // Trouver le pass avec le niveau le plus élevé
    const maxPassLevel = Math.max(...userPasses.map(pass => pass.level));

    // Récupérer les places accessibles en fonction du niveau de pass et de l'âge de l'utilisateur
    const accessiblePlaces = await db.collection('places').find({
      required_pass_level: { $lte: maxPassLevel }, // Comparer avec le pass de niveau le plus élevé
      required_age_level: { $lte: user.age },      // Vérifier l'âge
    }).toArray();

    return accessiblePlaces; // Retourner la liste des places accessibles
    }
}

module.exports = new PlaceService();

