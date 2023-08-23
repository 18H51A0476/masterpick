const {User} = require("../models/User")
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the user ID from req.user
    const user = await User.findById(userId); // Fetch user data from the database
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

const editProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the user ID from req.user
    const updatedFields = {
      rollNumber: req.body.rollNumber,
      phoneNumber: req.body.phoneNumber,
      college: req.body.college,
      branch: req.body.branch,
      linkeden : req.body.linkeden
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log("Error in editProfile", error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getProfile ,editProfile};
