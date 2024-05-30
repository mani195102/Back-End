// models/Booking.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    customerName: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Confirmed' }
});

module.exports = mongoose.model('Booking', BookingSchema);
