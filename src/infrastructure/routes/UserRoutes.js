const express = require('express');
const UserController = require('../controllers/UserController');
const validateUser = require('../middleware/userValidation');
const router = express.Router();

router.post('/', validateUser, UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', validateUser, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;