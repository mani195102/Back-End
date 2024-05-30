// controllers/roomController.js
const Room = require('../models/room');

exports.createRoom = async (req, res) => {
    try {
        const { name, seats, pricePerHour, amenities } = req.body;
        const room = new Room({ name, seats, pricePerHour, amenities });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('bookings');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
