// models/Assignment.js
const mongoose = require('mongoose');

const studentAssignmentSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // ID of the student submitting the assignment
  title: { type: String, required: true }, // Title of the assignment
  dueDate: { type: Date, required: true }, // Due date of the assignment
  fileUrl: { type: String, required: true }, // URL of the uploaded file
  submittedAt: { type: Date, default: Date.now }, // Timestamp of submission
});

module.exports = mongoose.model('Assignment', studentAssignmentSchema);