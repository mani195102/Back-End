// models/Room.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: { type: String, required: true },
    seats: { type: Number, required: true },
    pricePerHour: { type: Number, required: true },
    amenities: [String],
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

module.exports = mongoose.model('Room', RoomSchema);
