const {User} = require("../models/User")
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the user ID from req.user
    const user = await User.findById(userId); // Fetch user data from the database
    console.log("req-user",req.user)
    console.log("User: ",user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user data along with the user ID
    res.json({ user: user });
  } catch (error) {
    console.log("Error in getProfile",error)
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile };
