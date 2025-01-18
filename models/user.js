const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Booking = require('./booking');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true , unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false},
  password: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });



module.exports = User;
