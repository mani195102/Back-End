// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

// Database connection
//mongoose.connect('mongodb://localhost:27017/booking_app', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect( process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Models
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Customer = require('./models/Customer');

// Middleware
app.use(bodyParser.json());

// Routes
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/customers', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
