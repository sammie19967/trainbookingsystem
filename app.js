const express = require("express");
require('dotenv').config();
const app = express();

app.use(express.json());  // Middleware to parse JSON bodies

// Import the controller
const userController = require('./controllers/userController');
const bookingController = require('./controllers/bookingController');

// Import the middleware
const authenticateUser = require('./middleware/authenticateUser');

// Import models and database connection
const { sequelize } = require('./config/database');
const User = require('./models/user');
const Booking = require('./models/booking');

// Sync the models
sequelize.sync({ alter: true }).then(() => console.log('Models synced!'));

// Define associations
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// Set up routes
app.get('/', (req, res) => {
  res.send('Welcome to the Train Booking System!');
});

// Use authentication middleware for routes that require it
app.post('/bookings', authenticateUser, bookingController.createBooking);
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
