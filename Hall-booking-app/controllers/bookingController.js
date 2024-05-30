const mongoose = require('mongoose');
const Booking = require('../models/booking');
const Room = require('../models/room');

exports.bookRoom = async (req, res) => {
    try {
        const { customerName, date, startTime, endTime, roomId } = req.body;

        // Validate roomId
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ message: 'Invalid room ID' });
        }

        // Log received data
        console.log('Booking request data:', { customerName, date, startTime, endTime, roomId });

        // Convert roomId to ObjectId
        const roomObjectId = new mongoose.Types.ObjectId(roomId);

        // Log converted ObjectId
        console.log('Converted roomObjectId:', roomObjectId);

        const room = await Room.findById(roomObjectId);

        // Log room data
        console.log('Queried room data:', room);

        // Create a booking object with the provided data regardless of room existence
        const booking = new Booking({ customerName, date, startTime, endTime, roomId: roomObjectId });

        if (!room) {
            console.log('Room not found');
            await booking.save();
            return res.status(404).json({  booking }); // Include booking details in the response
        }

        const isBooked = await Booking.findOne({
            roomId: roomObjectId,
            date,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (isBooked) {
            return res.status(400).json({ message: 'Room is already booked for the specified time' });
        }

        await booking.save();

        room.bookings.push(booking._id);
        await room.save();

        res.status(201).json(booking);
    } catch (error) {
        console.error('Error booking room:', error);
        res.status(500).json({ message: error.message });
    }
};