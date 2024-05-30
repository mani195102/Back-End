// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.get('/', CustomerController.getAllCustomers);
router.get('/bookings', CustomerController.getAllCustomerBookings);

module.exports = router;
