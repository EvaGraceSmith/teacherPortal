'use strict';

const userModel = require('./users.js');
const classroomModel = require('./classrooms.js');

const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const sequelize = new Sequelize(DATABASE_URL);



module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  classroomModel: classroomModel(sequelize, DataTypes),
};


