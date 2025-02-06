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
// Define allowed origins
const allowedOrigins = [
    'http://localhost:4200',
    'https://flourishing-genie-1c2f33.netlify.app'
];

// Configure CORS middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow requests with no origin
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Enable preflight requests
app.options('*', cors());
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