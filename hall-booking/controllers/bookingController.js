const mongoose = require('mongoose');
const Booking = require('../models/Booking');

exports.bookRoom = async (req, res) => {
    try {
        const { customerName, date, startTime, endTime, roomId } = req.body;

        // Check if roomId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ error: 'Invalid roomId' });
        }

        // Convert roomId to ObjectId
        const roomIdObjectId = mongoose.Types.ObjectId.createFromHexString(roomId);

        // Check if the room is available
        const existingBooking = await Booking.findOne({
            roomId: roomIdObjectId,
            date,
            $or: [
                { startTime: { $lt: startTime }, endTime: { $gt: startTime } },
                { startTime: { $lt: endTime }, endTime: { $gt: endTime } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'Room already booked for this time slot' });
        }
        
        const booking = new Booking({ customerName, date, startTime, endTime, roomId: roomIdObjectId });
        await booking.save();
        res.status(201).json({ message: 'Room booked successfully', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('roomId');
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
};
