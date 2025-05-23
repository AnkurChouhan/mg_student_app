const express = require('express');
const router = express.Router();
const Student = require('../models/Students'); // fix model import path

// Show All Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.render('students', { students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Add New Student
router.post('/add', async (req, res) => {
  const { name, age, city, class: className } = req.body;

  if (!name || !city || !className || age == null) {
    return res.send('<script>alert("All fields are required!"); window.location="/students";</script>');
  }

  try {
    await Student.create({ name: name.trim(), age, city: city.trim(), class: className.trim() });
    res.redirect('/students');
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Edit Student
router.put('/edit/:id', async (req, res) => {
  const { name, age, city, class: className } = req.body;

  try {
    await Student.findByIdAndUpdate(req.params.id, {
      name: name.trim(),
      age,
      city: city.trim(),
      class: className.trim()
    });
    res.send('<script>alert("Student updated successfully!"); window.location="/students";</script>');
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete Student
router.delete('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send('<script>alert("Student deleted successfully!"); window.location="/students";</script>');
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
