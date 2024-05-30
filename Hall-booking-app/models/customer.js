// models/Customer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

module.exports = mongoose.model('Customer', CustomerSchema);
