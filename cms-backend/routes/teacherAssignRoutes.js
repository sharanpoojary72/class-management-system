const express = require('express');
const Assignment = require('../models/studentAssignSchema'); // For fetching students' assignments
const TeacherAssignment = require('../models/teacherAssignSchema'); // For teacher-related operations
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    },
});

const upload = multer({ storage });

// GET /api/teacher/assignments/students
router.get('/students', async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/teacher/assignments/upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { teacherId, className, title, dueDate } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Save teacher assignment details to MongoDB
        const teacherAssignment = new TeacherAssignment({
            teacherId,
            className,
            title,
            dueDate: new Date(dueDate),
            fileUrl: `/uploads/${file.filename}`, // Store relative file path
        });

        await teacherAssignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully', teacherAssignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/teacher/assignments
router.get('/teacherAssignments', async (req, res) => {
    try {
        const assignments = await TeacherAssignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;