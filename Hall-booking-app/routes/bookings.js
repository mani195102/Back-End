const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Book a room
router.post('/', bookingController.bookRoom);

module.exports = router;
