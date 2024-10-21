const express = require('express');
const UserRoutes = require('./UserRoutes');
const PassRoutes = require('./PassRoutes');
const PlaceRoutes = require('./PlaceRoutes');
const { authenticateToken, generateToken } = require('../middleware/auth')

const router = express.Router();

router.post('/login', generateToken);
router.use(authenticateToken);
router.use('/users', UserRoutes);
router.use('/passes', PassRoutes);
router.use('/places', PlaceRoutes);

module.exports = router;