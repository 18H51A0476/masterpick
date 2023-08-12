const express = require('express');
const { getProfile } = require('../lib/userController');
const protect = require('../middlewares/authMiddleWare');
const userRouter = express.Router();

// Route to handle Google Sign-In authentication
userRouter.get('/profile',protect, (req, res) => {
  getProfile(req, res);
});

// Add more authentication routes here

module.exports = userRouter;
