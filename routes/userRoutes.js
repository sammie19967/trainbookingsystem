const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Define routes for user-related actions
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a single user by ID
router.get('/users/:id', userController.getUserById);

// Get user by email
router.get('/users/email/:email', userController.getUserByEmail);

// Delete a user
router.delete('/users/:id', userController.deleteUser);

// Update a user
router.put('/users/:id', userController.updateUser);

module.exports = router;
