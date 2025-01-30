const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({
            success: true,
            data: teachers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch teacher data.',
            error: error.message,
        });
    }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found.',
            });
        }
        res.status(200).json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch teacher data.',
            error: error.message,
        });
    }
};

// Create a new teacher
exports.createTeacher = async (req, res) => {
    try {
        const { name, age, email, speciality, experience, role, password } = req.body;

        // Validate input
        if (!name || !email || !password || !speciality || !experience) {
            return res.status(400).json({ error: 'Name, email, password, speciality, and experience are required' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new teacher
        const newTeacher = new Teacher({
            name,
            age,
            email,
            speciality,
            experience,
            role,
            passwordHash
        });

        // Save the teacher to the database
        await newTeacher.save();

        res.status(201).json({
            success: true,
            message: 'Teacher created successfully.',
            data: newTeacher,
        });
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create teacher.',
            error: error.message || 'Internal server error',
        });
    }
};

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, email, speciality, experience, role, password } = req.body;

        // Validate input
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // Find the teacher by ID
        let teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Update teacher fields
        teacher.name = name;
        teacher.age = age;
        teacher.email = email;
        teacher.speciality = speciality;
        teacher.experience = experience;
        teacher.role = role;

        // Hash and update password if provided
        if (password) {
            teacher.passwordHash = await bcrypt.hash(password, 10);
        }

        // Save the updated teacher
        await teacher.save();

        res.status(200).json({
            success: true,
            message: 'Teacher updated successfully.',
            data: teacher,
        });
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update teacher.',
            error: error.message || 'Internal server error',
        });
    }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!deletedTeacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found.',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Teacher deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete teacher.',
            error: error.message,
        });
    }
};
