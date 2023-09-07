const Batch = require("../models/Batch"); // Import your Batch model

// Create a new batch
const createBatch = async (req, res) => {
  try {
    const batch = new Batch(req.body);
    const savedBatch = await batch.save();
    res.status(201).json(savedBatch);
  } catch (error) {
    res.status(500).json({ error: "Unable to create batch" });
  }
};

// Get all batches
const getAllBatches = async (req, res) => {
    try {
      const { searchQuery, page, pageSize } = req.query; // Extract searchQuery, page, and pageSize from query parameters
  
      let query = {}; // Initialize an empty query object
  
      // If searchQuery is provided, construct the query for searching
      if (searchQuery && searchQuery.trim() !== "") {
        const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search
        query = {
          batchName: searchRegex, // Replace with the actual field name for batch name
        };
      }
  
      // Get the total count of matching batches
      const totalCount = await Batch.countDocuments(query);
  
      // Calculate skip and limit based on page and pageSize parameters
      const skip = (parseInt(page) > 0 ? parseInt(page) : 0) * parseInt(pageSize);
      const limit = parseInt(pageSize);
  
      const batches = await Batch.find(query)
        .skip(skip)
        .limit(limit)
        .lean(); // Convert documents to plain JavaScript objects
  
      res.status(200).json({ batches, totalCount });
    } catch (error) {
      console.error("Error in getAllBatches:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Get a batch by ID
const getBatchById = async (req, res) => {
  const { batchId } = req.params;
  try {
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }
    res.status(200).json(batch);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch batch" });
  }
};

// Update a batch by ID
const updateBatch = async (req, res) => {
  const { batchId } = req.params;
  try {
    const updatedBatch = await Batch.findByIdAndUpdate(batchId, req.body, {
      new: true,
    });
    if (!updatedBatch) {
      return res.status(404).json({ error: "Batch not found" });
    }
    res.status(200).json(updatedBatch);
  } catch (error) {
    res.status(500).json({ error: "Unable to update batch" });
  }
};

// Delete a batch by ID
const deleteBatch = async (req, res) => {
  const { batchId } = req.params;
  try {
    const deletedBatch = await Batch.findByIdAndDelete(batchId);
    if (!deletedBatch) {
      return res.status(404).json({ error: "Batch not found" });
    }
    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ error: "Unable to delete batch" });
  }
};

module.exports = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
};
