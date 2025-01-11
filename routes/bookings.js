const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const [bookings] = await db.query(`
      SELECT 
        b.booking_id, 
        u.name AS user_name, 
        t.train_type, 
        r.from_location, 
        r.to_location, 
        b.departure_date, 
        b.departure_time, 
        b.return_date, 
        b.round_trip, 
        b.price, 
        b.status
      FROM Bookings b
      JOIN Users u ON b.user_id = u.user_id
      JOIN Trains t ON b.train_id = t.train_id
      JOIN Routes r ON b.route_id = r.route_id
    `);
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create a new booking
// Create a new booking
router.post('/', async (req, res) => {
    const {
      user_id,
      train_type, 
      from_location,
      to_location,
      departure_date,
      departure_time,
      return_date,
      round_trip,
      price,
      status
    } = req.body;
  
    try {
      // Validate that the train type exists
      const [train] = await db.query(
        'SELECT train_type FROM Trains WHERE train_type = ?',
        [train_type]
      );
  
      if (!train || train.length === 0) {
        return res.status(400).json({ error: 'Invalid train type' });
      }
  
      // Validate that the route exists for the given train type
      const [route] = await db.query(
        'SELECT route_id FROM Routes WHERE train_type = ? AND from_location = ? AND to_location = ?',
        [train_type, from_location, to_location]
      );
  
      if (!route || route.length === 0) {
        return res.status(400).json({ error: 'Invalid route selected' });
      }
  
      // Insert the booking
      const [result] = await db.query(
        'INSERT INTO Bookings (user_id, train_type, route_id, departure_date, departure_time, return_date, round_trip, price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          user_id,
          train_type,
          route.route_id,
          departure_date,
          departure_time,
          return_date,
          round_trip,
          price,
          status
        ]
      );
  
      res.status(201).json({
        message: 'Booking created successfully',
        bookingId: result.insertId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });
  
  

module.exports = router;
