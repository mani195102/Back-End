// controllers/roomController.js
const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
    try {
        const { name, seatsAvailable, pricePerHour, amenities } = req.body;
        const room = new Room({ name, seatsAvailable, pricePerHour, amenities });
        await room.save();
        res.status(201).json({ message: 'Room created successfully', room });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
