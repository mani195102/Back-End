// controllers/customerController.js
const Booking = require('../models/booking');
const Room = require('../models/room');

exports.listCustomers = async (req, res) => {
    try {
        // Fetch bookings and rooms data from the database
        const bookings = await Booking.find();
        const rooms = await Room.find();

        // Check if bookings and rooms data are available
        if (!bookings || !rooms) {
            return res.status(500).json({ message: 'Bookings or rooms data is not available' });
        }

        const customerData = bookings.map(booking => ({
            customerName: booking.customerName,
            roomName: rooms.find(room => String(room._id) === String(booking.roomId))?.name || 'Unknown',
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        }));

        res.json(customerData);
    } catch (error) {
        console.error('Error listing customers:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.listCustomerBookings = async (req, res) => {
    const customerName = req.params.customerName;

    try {
        // Fetch bookings data from the database
        const bookings = await Booking.find({ customerName });

        // Check if any bookings were found for the customer
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this customer' });
        }

        // Fetch room details for each booking
        const customerBookings = await Promise.all(bookings.map(async booking => {
            const room = await Room.findById(booking.roomId);
            return {
                customerName: booking.customerName,
                roomName: room ? room.name : 'Unknown',
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                bookingId: booking.id,
                bookingDate: booking.bookingDate,
                bookingStatus: booking.status
            };
        }));

        res.json(customerBookings);
    } catch (error) {
        console.error('Error listing customer bookings:', error);
        res.status(500).json({ message: error.message });
    }
};
