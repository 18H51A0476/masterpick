const express = require('express');
const { createCollege, getColleges, editCollege, deleteCollege } = require('../lib/collegeController');
const protect = require('../middlewares/authMiddleWare');
const collegeRouter = express.Router();

// Route to create a new college
collegeRouter.post('/add', protect, (req, res) => {
  createCollege(req, res);
});

// Route to get a list of colleges
collegeRouter.get('', protect, (req, res) => {
  getColleges(req, res);
});

// Route to edit a college
collegeRouter.put('/:id', protect, (req, res) => {
  editCollege(req, res);
});

// Route to delete a college
collegeRouter.delete('/:id', protect, (req, res) => {
  deleteCollege(req, res);
});

// Add more college-related routes here

module.exports = collegeRouter;
