const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM Users');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, password, phone_number } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Users (name, email, password, phone_number) VALUES (?, ?, ?, ?)',
      [name, email, password, phone_number]
    );
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;
