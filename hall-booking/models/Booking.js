// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
