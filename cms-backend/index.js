const express = require("express");
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const studentRoutes = require('./routes/adminStudentRoutes');
const teacherRoutes = require('./routes/adminTeacherRoutes');
const studentAssignRoutes = require('./routes/studentAssignRoutes');
const teacherAssignRoutes = require('./routes/teacherAssignRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from Angular frontend
}));
app.use(express.json()); // Parse JSON request bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files


// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// Student Assignment Routes
app.use('/api/student/assignments', studentAssignRoutes);

// Teacher Assignment Routes
app.use('/api/teacher/assignments', teacherAssignRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});