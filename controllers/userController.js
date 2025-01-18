//const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    console.log('Request Body:', req.body); 
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error('Registration Error:', error); // Log error for easier debugging
      res.status(500).json({ message: 'Registration failed', error });
    }
  };
  


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      res.json({ token, user });
    } catch (error) {
      console.error('Login Error:', error); // Add logging to capture the error
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  };
  const User = require('../models/user');

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting user' });
  }
};


// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash password if updated
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    // Update the user fields
    const updatedUser = await user.update({
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword,
    });

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();  // Fetch all users
    return res.status(200).json(users);  // Send the users as a response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
};
// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Get a user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};



    // Create logic to delete and update the user
    // Implement logic to retrieve and display the user's bookings
    // Implement logic to retrieve and display the user's pending bookings
    // Implement logic to retrieve and display the user's successful bookings
    // Implement logic to retrieve and display the user's cancelled bookings
    // Implement logic to retrieve and display the user's refund requests
    // Implement logic to retrieve and display the user's booking history
    // Implement logic to retrieve and display the user's booking cancellation history
    // Implement logic to retrieve and display the user's booking preferences
    // Implement logic to retrieve and display the user's booking history and cancellation history
    // Implement logic to retrieve and display the user's notifications
    // Implement logic to retrieve and display the user's payment history
    // Implement logic to retrieve and display the user's booking preferences
    // Implement logic to retrieve and display the user's booking history and cancellation history
    // Implement logic to retrieve and display the user's notifications

    // Implement password hashing for user passwords
    // Implement password reset functionality
    // Implement role-based access control (RBAC) for admin users
    // Implement user profile updates
    // Implement user booking history
    // Implement user authentication using JWT
    // Implement user validation for email and password
    // Implement user notifications for booking updates
    // Implement user security measures, such as rate limiting, input sanitization, and encryption
    // Implement user authentication using OAuth (e.g., Google, Facebook, Twitter)
    // Implement user password recovery using email verification and password reset links
    // Implement user password change functionality
    // Implement user booking cancellation and refund functionality
    // Implement user booking preferences and preferences updates
    // Implement user booking history and cancellation history
    


