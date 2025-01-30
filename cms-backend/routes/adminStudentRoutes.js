const express = require('express');
const bodyParser = require('body-parser');



const router = express();
router.use(bodyParser.json());

const studentController = require('../controllers/student.controller');

// CRUD routes for students
router.get('/', studentController.getAllStudents); // Get all students
router.get('/:id', studentController.getStudentById); // Get a single student by ID
router.post('/', studentController.createStudent); // Create a new student
router.put('/:id', studentController.updateStudent); // Update a student by ID
router.delete('/:id', studentController.deleteStudent); // Delete a student by ID

module.exports = router;