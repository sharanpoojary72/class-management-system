// models/TeacherAssignment.js
const mongoose = require('mongoose');

const teacherAssignmentSchema = new mongoose.Schema({
  teacherId: { type: String, required: true }, // ID of the teacher uploading the assignment
  className: { type: String, required: true }, // Class name for which the assignment is uploaded
  title: { type: String, required: true }, // Title of the assignment
  fileUrl: { type: String, required: true }, // URL of the uploaded file
  dueDate: { type: Date, required: true }, // Due date of the assignment
  createdAt: { type: Date, default: Date.now }, // Timestamp of creation
});

module.exports = mongoose.model('TeacherAssignment', teacherAssignmentSchema);