const express = require('express');
const PassController = require('../controllers/PassController');
const validatePass = require('../middleware/passValidation')
const router = express.Router();

router.post('/', (req, res, next) => validatePass(req.db)(req, res, next), PassController.createPass);
router.get('/:id', PassController.getPassById);
router.get('/', PassController.getAllPasses);
router.put('/:id', validatePass, PassController.updatePass);
router.delete('/:id', PassController.deletePass);

module.exports = router;

