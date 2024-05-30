// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController');

router.post('/', RoomController.createRoom);
router.get('/', RoomController.getAllRooms);

module.exports = router;
