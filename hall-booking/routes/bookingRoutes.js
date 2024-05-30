// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

router.post('/', BookingController.bookRoom);
router.get('/', BookingController.getAllBookings);

module.exports = router;
