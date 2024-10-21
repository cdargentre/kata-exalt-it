const PlaceService = require('../../application/services/PlaceService'); // Import du service

// CRUD pour les places
const createPlace = async (req, res) => {
  try {
    const { address, phone_number, required_pass_level, required_age_level } = req.body;

    // Validation des données
    if (!address || !phone_number || !required_pass_level || !required_age_level) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const newPlace = await PlaceService.createPlace({
      address,
      phone_number: phone_number,
      requiredPassLevel: required_pass_level,
      requiredAgeLevel: required_age_level
    }, req.db);
    
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: 'Error creating place', error: error.message });
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await PlaceService.getPlaceById(req.params.id, req.db);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching place', error: error.message });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await PlaceService.getAllPlaces(req.db);
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error: error.message });
  }
};

const updatePlace = async (req, res) => {
  try {
    const result = await PlaceService.updatePlace(req.params.id, req.body, req.db);
    if (result.modifiedCount === 0) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json({ message: 'Place updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating place', error: error.message });
  }
};

const deletePlace = async (req, res) => {
  try {
    const result = await PlaceService.deletePlace(req.params.id, req.db);
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Place not found' });
    res.status(204).json({ message: 'Place deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting place', error: error.message });
  }
};

// Vérifier si un utilisateur a accès à une place
const checkUserAccessToPlace = async (req, res) => {
  try {
    const { userId, placeId } = req.params; 

    const accessGranted = await PlaceService.checkUserAccess(userId, placeId, req.db);

    if (accessGranted) {
      res.status(200).json({ message: 'Access granted' });
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir la liste des places accessibles par un utilisateur
const getAccessiblePlacesByUser = async (req, res) => {
  try {
    const { userId } = req.params; 
    const accessiblePlaces = await PlaceService.getAccessiblePlacesForUser(userId, req.db);

    res.status(200).json(accessiblePlaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlace,
  getPlaceById,
  getAllPlaces,
  updatePlace,
  deletePlace,
  checkUserAccessToPlace,
  getAccessiblePlacesByUser,
};
