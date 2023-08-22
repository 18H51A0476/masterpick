const express = require('express');
const protect = require('../middlewares/authMiddleWare');
const { searchUsers, updateUserRole } = require('../lib/adminController');
const adminRouter = express.Router();

// Route to handle Google Sign-In authentication
adminRouter.get('/users',protect, (req, res) => {
     searchUsers(req,res)
});

// Route to handle Google Sign-In authentication
adminRouter.put('/user/role',protect, (req, res) => {
     updateUserRole(req,res)
});

// Add more authentication routes here

module.exports = adminRouter;
