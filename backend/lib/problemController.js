const Problem = require("../models/Problem");

// Create a new problem
const createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    const savedProblem = await problem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    console.error("Error in create problem",error)
    res.status(500).json({ error: "Unable to create problem" });
  }
};

// Get all problems
const getAllProblems = async (req, res) => {
  try {
    const { searchQuery, page, pageSize, tags, difficulty } = req.query;

    let query = {};

    // If searchQuery is provided, construct the query for searching in title
    if (searchQuery && searchQuery.trim() !== "") {
      query.title = new RegExp(searchQuery, "i"); // Case-insensitive search for title
    }

    // If tags are provided, filter by tags
    if (tags && Array.isArray(tags)) {
      query.tags = { $in: tags };
    }

    // If difficulty is provided, filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Get the total count of matching problems
    const totalCount = await Problem.countDocuments(query);

    // Calculate skip and limit based on page and pageSize parameters
    const skip = (parseInt(page) > 0 ? parseInt(page) : 0) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const problems = await Problem.find(query)
      .skip(skip)
      .limit(limit)
      .lean(); // Convert documents to plain JavaScript objects

    res.status(200).json({ problems, totalCount });
  } catch (error) {
    console.error("Error in getAllProblems:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a problem by slug
const getProblemBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
      const problem = await Problem.findOne({ slug });
      if (!problem) {
        return res.status(404).json({ error: "Problem not found" });
      }
      res.status(200).json(problem);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch problem" });
    }
  };
  
  // Update a problem by slug
  const updateProblemBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
      const updatedProblem = await Problem.findOneAndUpdate({ slug }, req.body, {
        new: true,
      });
      if (!updatedProblem) {
        return res.status(404).json({ error: "Problem not found" });
      }
      res.status(200).json(updatedProblem);
    } catch (error) {
      res.status(500).json({ error: "Unable to update problem" });
    }
  };
  

// Delete a problem by ID
const deleteProblem = async (req, res) => {
  const { problemId } = req.params;
  try {
    const deletedProblem = await Problem.findByIdAndDelete(problemId);
    if (!deletedProblem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ error: "Unable to delete problem" });
  }
};

module.exports = {
  createProblem,
  getAllProblems,
  getProblemBySlug,
  updateProblemBySlug,
  deleteProblem,
};
