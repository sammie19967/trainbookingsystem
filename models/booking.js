const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  trainType: { type: DataTypes.ENUM('Express', 'InterCounty'), allowNull: false },
  from: { type: DataTypes.STRING, allowNull: false },
  to: { type: DataTypes.STRING, allowNull: false },
  departureDate: { type: DataTypes.DATEONLY, allowNull: false },
  departureTime: { type: DataTypes.STRING, allowNull: false },
  returnDate: { type: DataTypes.DATEONLY },
  returnTime: { type: DataTypes.STRING },
  classType: { type: DataTypes.ENUM('Economy', 'Premium'), allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM('Pending', 'Paid'), defaultValue: 'Pending' },
});




module.exports = Booking;
