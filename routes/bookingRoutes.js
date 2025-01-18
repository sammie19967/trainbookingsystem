const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Define routes for booking-related actions
router.post('/bookings', bookingController.createBooking);

module.exports = router;
