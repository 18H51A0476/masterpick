const { User } = require("../models/User");

const searchUsers = async (req, res) => {
  try {
    const { searchQuery, page, pageSize } = req.query; // Extract searchQuery, page, and pageSize from query parameters

    let query = {}; // Initialize an empty query object

    // If searchQuery is provided, construct the query for searching
    if (searchQuery && searchQuery.trim() !== "") {
      const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search
      query = {
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { rollNumber: searchRegex }, // Replace with the actual field name for roll number
        ],
      };
    }

    // Get the total count of matching users
    const totalCount = await User.countDocuments(query);

    // Calculate skip and limit based on page and pageSize parameters
    const skip = (parseInt(page) > 0 ? parseInt(page): 0) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .lean(); // Convert documents to plain JavaScript objects

    console.log("Success :", users, totalCount);
    res.json({ users, totalCount });
  } catch (error) {
    console.log("Error in searchUsers", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { _id, newRole } = req.body; // Extract _id and newRole from request body

    if (!_id) {
      return res.status(400).json({ message: "Missing _id in request body" });
    }

    if (!newRole) {
      return res.status(400).json({ message: "Missing newRole in request body" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: { role: newRole } },
      { new: true }
    ).lean(); // Update and get the updated document

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.log("Error in updateUserRole", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { searchUsers,updateUserRole };
