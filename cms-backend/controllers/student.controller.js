const Student = require('../models/studentSchema');
const bcrypt = require('bcrypt');

// Get all students
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

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found.',
            });
        }
        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student data.',
            error: error.message,
        });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const { name, age, email, course, enrolledDate, role, password } = req.body;

        // Validate input
        if (!name || !email || !password || !course || !enrolledDate) {
            return res.status(400).json({ error: 'Name, email, password, course, and enrolledDate are required' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new student
        const newStudent = new Student({
            name,
            age,
            email,
            course,
            enrolledDate: new Date(enrolledDate),
            role,
            passwordHash
        });

        // Save the student to the database
        await newStudent.save();

        res.status(201).json({
            success: true,
            message: 'Student created successfully.',
            data: newStudent,
        });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create student.',
            error: error.message || 'Internal server error',
        });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, email, course, enrolledDate, role, password } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // Find the student by ID
        let student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Update student fields
        student.name = name;
        student.age = age;
        student.email = email;
        student.course = course;
        student.enrolledDate = enrolledDate ? new Date(enrolledDate) : student.enrolledDate;
        student.role = role;

        // Hash and update password if provided
        if (password) {
            student.passwordHash = await bcrypt.hash(password, 10);
        }

        // Save the updated student
        await student.save();

        res.status(200).json({
            success: true,
            message: 'Student updated successfully.',
            data: student,
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update student.',
            error: error.message || 'Internal server error',
        });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Student not found.',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete student.',
            error: error.message,
        });
    }
};
