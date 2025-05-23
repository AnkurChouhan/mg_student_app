const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const studentRoutes = require('./routes/index');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from /public (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Override HTTP methods for PUT and DELETE in forms (_method query param)
app.use(methodOverride('_method'));

// Mount the student routes at /students
app.use('/students', studentRoutes);

// Redirect root URL to /students for convenience
app.get('/', (req, res) => {
  res.redirect('/students');
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

// Use port 3000 for the web server (instead of 27017 which is MongoDB's port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
