'use strict';

const userModel = (sequelize, DataTypes) => sequelize.define('Users', {
  username: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING, required: true },
  role: { type: DataTypes.ENUM('student', 'teacher', 'admin'), required: true },
});
module.exports = userModel;
