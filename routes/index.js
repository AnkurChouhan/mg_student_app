const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// =======================
// 🔍 Show All Tasks
// =======================
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // optional sorting
    res.render('index', { tasks });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal Server Error');
  }
});

// =======================
// ➕ Add New Task
// =======================
router.post('/add', async (req, res) => {
  const { title, priority } = req.body;
  if (!title || !title.trim()) {
    return res.send('<script>alert("Task title cannot be empty!"); window.location="/";</script>');
  }

  try {
    await Task.create({ title: title.trim(), priority });
    res.redirect('/');
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Internal Server Error');
  }
});

// =======================
// ✏️ Edit Task
// =======================
router.put('/edit/:id', async (req, res) => {
  const { title, priority } = req.body;

  try {
    await Task.findByIdAndUpdate(req.params.id, {
      title: title.trim(),
      priority
    });
    res.send('<script>alert("Todo updated successfully!"); window.location="/";</script>');
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Internal Server Error');
  }
});

// =======================
// ❌ Delete Task
// =======================
router.delete('/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send('<script>alert("Todo deleted successfully!"); window.location="/";</script>');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
