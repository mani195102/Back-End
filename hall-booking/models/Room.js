// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seatsAvailable: { type: Number, required: true },
    pricePerHour: { type: Number, required: true },
    amenities: [String]
});

module.exports = mongoose.model('Room', roomSchema);
