const College = require("../models/College")


const createCollege = async (req, res) => {
  try {
    const { collegeName } = req.body;

    const newCollege = new College({
      collegeName,
    });

    const savedCollege = await newCollege.save();
    res.status(201).json({ college: savedCollege });
  } catch (error) {
    console.error("Error in createCollege:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getColleges = async (req, res) => {
    try {
      const { searchQuery, page, pageSize } = req.query; // Extract searchQuery, page, and pageSize from query parameters
  
      let query = {}; // Initialize an empty query object
  
      // If searchQuery is provided, construct the query for searching
      if (searchQuery && searchQuery.trim() !== "") {
        const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search
        query = {
          collegeName: searchRegex, // Replace with the actual field name for college name
        };
      }
  
      // Get the total count of matching colleges
      //const totalCount = await College.countDocuments(query);
      const totalCount = await College.countDocuments(query);

      // Calculate skip and limit based on page and pageSize parameters
      const skip = (parseInt(page) > 0 ? parseInt(page) : 0) * parseInt(pageSize);
      const limit = parseInt(pageSize);

      console.log("skip and limit",skip,limit);
  
      const colleges = await College.find(query)
        .skip(skip)
        .limit(limit)
        .lean(); // Convert documents to plain JavaScript objects
  
      console.log("Success:", colleges, totalCount);
      res.status(200).json({ colleges, totalCount });
    } catch (error) {
      console.log("Error in getColleges:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

const editCollege = async (req, res) => {
  try {
    const collegeId = req.params.id;
    const { collegeName } = req.body;

    const updatedCollege = await College.findByIdAndUpdate(
      collegeId,
      { $set: { collegeName } },
      { new: true }
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({ college: updatedCollege });
  } catch (error) {
    console.error("Error in editCollege:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCollege = async (req, res) => {
  try {
    const collegeId = req.params.id;

    const deletedCollege = await College.findByIdAndDelete(collegeId);

    if (!deletedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({ message: "College deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCollege:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllColleges = async (req,res) => {
  try {
    const colleges = await College.find({});
    return res.status(200).json({message:"success",data:colleges})
  } catch (error) {
    console.error("Error in getAllColleges", error);
    res.status(500).json({message:"Server error"})
  }
}

module.exports = { createCollege, getColleges, editCollege, deleteCollege ,getAllColleges};
