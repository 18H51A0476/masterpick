const express = require('express');
const { authenticateWithGoogle } = require('../auth/authController');

const authRouter = express.Router();

// Route to handle Google Sign-In authentication
authRouter.post('/login', (req, res) => {
  authenticateWithGoogle(req, res);
});

// Add more authentication routes here

module.exports = authRouter;
