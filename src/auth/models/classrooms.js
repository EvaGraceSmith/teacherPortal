'use strict';

const classroomModel = (sequelize, DataTypes) => sequelize.define('Classroom', {
  subject: { type: DataTypes.ENUM('math', 'history', 'reading'), required: true },
  teacherName: { type: DataTypes.STRING, required: true },
//   studentList: { type: DataTypes.ARRAY, required: true, defaultValue: []},
});
module.exports = classroomModel;
