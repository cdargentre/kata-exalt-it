const express = require('express');
const PlaceController = require('../controllers/PlaceController');
const router = express.Router();
const validatePlace = require('../middleware/placeValidation');

router.post('/', validatePlace, PlaceController.createPlace);
router.get('/', PlaceController.getAllPlaces);
router.get('/:id', PlaceController.getPlaceById);
router.put('/:id', validatePlace, PlaceController.updatePlace);
router.delete('/:id', PlaceController.deletePlace);
router.get('/:placeId/access/:userId', PlaceController.checkUserAccessToPlace);
router.get('/access/:userId', PlaceController.getAccessiblePlacesByUser);

module.exports = router;
