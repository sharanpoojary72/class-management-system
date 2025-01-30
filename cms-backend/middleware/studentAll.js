const Student = require('../models/student.model');

// Fetch all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            success: true,
            data: students,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student data.',
            error: error.message,
        });
    }
};

// Add more CRUD operations here if needed
