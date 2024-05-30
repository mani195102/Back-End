const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// create a room 
router.post('/', roomController.createRoom);

// list all the roms with booked data
router.get('/', roomController.listRooms);

module.exports = router;
