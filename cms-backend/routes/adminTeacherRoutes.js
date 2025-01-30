// routes/teacherRoutes.js
const express = require('express');
const {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
} = require('../controllers/teacher.controller');

const router = express.Router();

// @route   GET /api/teachers
// @desc    Get all teachers
// @access  Public
router.get('/', getAllTeachers);

// @route   GET /api/teachers/:id
// @desc    Get a single teacher by ID
// @access  Public
router.get('/:id', getTeacherById);

// @route   POST /api/teachers
// @desc    Create a new teacher
// @access  Public
router.post('/', createTeacher);

// @route   PUT /api/teachers/:id
// @desc    Update a teacher by ID
// @access  Public
router.put('/:id', updateTeacher);

// @route   DELETE /api/teachers/:id
// @desc    Delete a teacher by ID
// @access  Public
router.delete('/:id', deleteTeacher);

module.exports = router;
