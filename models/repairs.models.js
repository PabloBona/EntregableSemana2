const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Repair = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

module.exports = Repair;
