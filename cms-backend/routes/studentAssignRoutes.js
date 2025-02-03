const express = require('express');
const multer = require('multer');
const Assignment = require('../models/studentAssignSchema'); // For student-related operations
const TeacherAssignment = require('../models/teacherAssignSchema'); // For fetching teacher assignments
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

// POST /api/assignments/upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { studentId, title, dueDate } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Save assignment details to MongoDB
        const assignment = new Assignment({
            studentId,
            title,
            dueDate: new Date(dueDate),
            fileUrl: `/uploads/${file.filename}`, // Store relative file path
        });

        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully', assignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/assignments/teacher
router.get('/assignments/teacher', async (req, res) => {
    try {
        const assignments = await TeacherAssignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;