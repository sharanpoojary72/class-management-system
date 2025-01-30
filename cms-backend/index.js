const express = require("express");
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/adminStudentRoutes');
const teacherRoutes = require('./routes/adminTeacherRoutes');

// Load environment variables
// dotenv.config();


const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:4200',
}));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});