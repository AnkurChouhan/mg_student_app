const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const taskRoutes = require('./routes/index');

const app = express();

// =======================
// ✅ MongoDB Connection
// =======================
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

// =======================
// ✅ Middleware
// =======================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure views path is correct
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Replaces body-parser
app.use(methodOverride('_method'));

// =======================
// ✅ Routes
// =======================
app.use('/', taskRoutes);

// =======================
// ✅ 404 Handler (Optional)
app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

// =======================
// ✅ Start Server
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${27017}`);
});
