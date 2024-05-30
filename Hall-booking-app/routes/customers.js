const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// List all customers with booked data
router.get('/', customerController.listCustomers);

// List how many times a customer booked the room
router.get('/:customerName/bookings', customerController.listCustomerBookings);

module.exports = router;
