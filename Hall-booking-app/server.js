const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const roomController = require('./controllers/roomController');
const bookingController = require('./controllers/bookingController');
const customerController = require('./controllers/customerController');
require("dotenv").config();
const PORT = 3000;

// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// importing controllers
app.post('/api/rooms', roomController.createRoom);
app.get('/api/rooms', roomController.listRooms);

app.post('/api/bookings', bookingController.bookRoom);

app.get('/api/customers', customerController.listCustomers); // Register the route

app.get('/api/customers/:customerName/bookings', customerController.listCustomerBookings); // Register the customer-specific bookings route

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


mongoose.connect(process.env.MONGODB).then(() =>{
    console.log("connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) =>{
    console.log("connection error :",error.message);
})

