const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    course: { type: String, required: true },
    enrolledDate: { type: Date, required: true },
    role: { type: String, required: true, default: 'Student' }
})

module.exports = mongoose.model('students', studentSchema);