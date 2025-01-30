// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    experience: {
        type: String,
        required: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: 'Teacher' }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Teacher', teacherSchema);
