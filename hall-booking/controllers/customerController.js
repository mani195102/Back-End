// controllers/customerController.js
const Booking = require('../models/Booking');

exports.getAllCustomers = async (req, res) => {
    try {
        // Query all bookings and populate the customerName and roomId fields
        const bookings = await Booking.find()
            .populate('customerName', 'customerName')
            .populate('roomId', 'roomName')
            .select('customerName date startTime endTime');

        // Check if there are no bookings found
        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No customers found' });
        }
        // Return the bookings with customerName, roomName, date, startTime, and endTime
        res.json(bookings);
    } catch (err) {
        console.error('Error retrieving customers:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllCustomerBookings = async (req, res) => {
    try {
        const customerBookings = await Booking.find().populate('roomId').where('customerName', req.query.customerName);
        res.json(customerBookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

